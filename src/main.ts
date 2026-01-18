import * as Blockly from "blockly"
import type { L10N } from "./l10n"
import { JaJpL10N } from "./l10n/ja-jp"
import { EnUsL10N } from "./l10n/en-us"
import { createMenu } from "./ui/menu"
import { CalciumEditor } from "./editor"
import { editorState } from "./ui/state/editor-state"
import "./loadJson.js"

// Detect the user's preferred language
const userLanguage =
  navigator.language || (navigator.languages && navigator.languages[0])

let l10n: L10N
let calciumEditor: CalciumEditor
// timer id used to debounce autosave (number from window.setTimeout)
let autosaveTimer: number | undefined

if (userLanguage === "ja-JP" || userLanguage === "ja") {
  await import("./lang/ja-jp/message")
  await import("./lang/ja-jp/tooltip")
  await import("./lang/ps-jp")
  const ja = await import("./lang/ja-jp")
  calciumEditor = ja.buildCalciumEditor(
    document.querySelector("#editor")!,
    "calc(100% - 48px)",
  )
  l10n = new JaJpL10N()
  await import("./generator/calcium")
  await import("./generator/pseudo")
} else {
  await import("./lang/en-us/message")
  await import("./lang/en-us/tooltip")
  const en = await import("./lang/en-us")
  calciumEditor = en.buildCalciumEditor(
    document.querySelector("#editor")!,
    "calc(100% - 48px)",
  )
  l10n = new EnUsL10N()
  await import("./generator/calcium")
}

document.title = l10n.title
// set description meta tag
const descriptionMeta = document.querySelector(
  'meta[name="description"]',
) as HTMLMetaElement
descriptionMeta.content = l10n.description

editorState.editor = calciumEditor
editorState.l10n = l10n

createMenu(l10n)

const previousCode = localStorage.getItem(`calcium-editor-${l10n.savedFile}`)
if (previousCode) {
  Blockly.serialization.workspaces.load(
    JSON.parse(previousCode!),
    editorState.editor.workspace,
  )
} else {
  const contentJsonName = new URLSearchParams(window.location.search).get(
    "json",
  )
  if (contentJsonName) {
    try {
      const response = await fetch(
        `${window.location.origin}/content/${contentJsonName}.json`,
      )
      if (response.ok) {
        const contentJson = await response.json()
        Blockly.serialization.workspaces.load(
          contentJson,
          editorState.editor.workspace,
        )
      } else {
        console.warn(
          `Failed to load content JSON: ${response.status} ${response.statusText}`,
        )
      }
    } catch (error) {
      console.error("Error fetching content JSON:", error)
    }
  }
}

editorState.editor.workspace.addChangeListener((e) => {
  if (editorState.isLoadingFile && e.type !== Blockly.Events.FINISHED_LOADING) {
    // do not autosave when loading a file
    return
  }
  if (editorState.isLoadingFile && e.type === Blockly.Events.FINISHED_LOADING) {
    // finished loading a file then re-enable autosave
    editorState.isLoadingFile = false
    return
  }
  // debounce autosave to avoid frequent saves while the user is actively editing.
  // Clear any pending save.
  if (autosaveTimer !== undefined) {
    clearTimeout(autosaveTimer)
  }

  const blockCode = Blockly.serialization.workspaces.save(
    editorState.editor.workspace,
  )
  autosaveTimer = setTimeout(() => {
    localStorage.setItem(
      `calcium-editor-${l10n.savedFile}`,
      JSON.stringify(blockCode),
    )
    autosaveTimer = undefined
  }, 2000)
})

window.onbeforeunload = (e) => {
  e.preventDefault()
}
