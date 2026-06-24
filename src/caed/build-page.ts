import * as Blockly from "blockly"
import { createMenu } from "../ui/menu.js"
import { editorState } from "../ui/state/editor-state.js"
import "../load-json.js"
import { LOCALSTORAGE_KEY_PREFIX } from "./prefix.js"

export async function buildPage() {
  // timer id used to debounce autosave (number from window.setTimeout)
  let autosaveTimer: number | undefined

  createMenu(editorState.l10n)

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
  } else {
    const previousCode = localStorage.getItem(
      `${LOCALSTORAGE_KEY_PREFIX}${editorState.l10n.savedFile}`,
    )
    if (previousCode) {
      Blockly.serialization.workspaces.load(
        JSON.parse(previousCode!),
        editorState.editor.workspace,
      )
    }
  }

  editorState.editor.workspace.addChangeListener((e) => {
    if (
      editorState.isLoadingFile &&
      e.type !== Blockly.Events.FINISHED_LOADING
    ) {
      // do not autosave when loading a file
      return
    }
    if (
      editorState.isLoadingFile &&
      e.type === Blockly.Events.FINISHED_LOADING
    ) {
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
        `${LOCALSTORAGE_KEY_PREFIX}${editorState.l10n.savedFile}`,
        JSON.stringify(blockCode),
      )
      autosaveTimer = undefined
    }, 2000)
  })

  window.onbeforeunload = (e) => {
    e.preventDefault()
  }
}
