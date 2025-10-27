import * as Blockly from "blockly"
import type { L10N } from "./l10n"
import { JaJpL10N } from "./l10n/ja-jp"
import { EnUsL10N } from "./l10n/en-us"
import { createMenu } from "./ui/menu"
import { CalciumEditor } from "./editor"
import { editorState } from "./ui/state/editor-state"
// Detect the user's preferred language
const userLanguage =
  navigator.language || (navigator.languages && navigator.languages[0])

let l10n: L10N
let calciumEditor: CalciumEditor

if (userLanguage === "ja-JP" || userLanguage === "ja") {
  await import("./lang/ja-jp/message")
  await import("./lang/ja-jp/tooltip")
  const ja = await import("./lang/ja-jp")
  calciumEditor = ja.buildCalciumEditor(
    document.querySelector("#editor")!,
    "calc(100% - 48px)"
  )
  l10n = new JaJpL10N()
} else {
  await import("./lang/en-us/message")
  await import("./lang/en-us/tooltip")
  const en = await import("./lang/en-us")
  calciumEditor = en.buildCalciumEditor(
    document.querySelector("#editor")!,
    "calc(100% - 48px)"
  )
  l10n = new EnUsL10N()
}

document.title = l10n.title
// set description meta tag
const descriptionMeta = document.querySelector(
  'meta[name="description"]'
) as HTMLMetaElement
descriptionMeta.content = l10n.description

editorState.editor = calciumEditor
editorState.l10n = l10n

createMenu(l10n)

const previousCode = localStorage.getItem(`calcium-editor-${l10n.savedFile}`)
if (previousCode) {
  Blockly.serialization.workspaces.load(
    JSON.parse(previousCode!),
    editorState.editor.workspace
  )
}

editorState.editor.workspace.addChangeListener((e) => {
  if (e.type === Blockly.Events.FINISHED_LOADING || editorState.isLoadingFile) {
    // do not autosave when loading a file
    editorState.isLoadingFile = false
    return
  }
  const blockCode = Blockly.serialization.workspaces.save(
    editorState.editor.workspace
  )
  localStorage.setItem(
    `calcium-editor-${l10n.savedFile}`,
    JSON.stringify(blockCode)
  )
})

window.onbeforeunload = (e) => {
  e.preventDefault()
}
