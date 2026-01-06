import { editorState } from "./ui/state/editor-state.js"
import * as Blockly from "blockly"

function _loadJson(json) {
  editorState.isLoadingFile = true
  if (json instanceof String || typeof json === "string") {
    json = JSON.parse(json)
  }
  Blockly.serialization.workspaces.load(json, editorState.editor.workspace)
}

function _dumpJson() {
  const json = Blockly.serialization.workspaces.save(
    editorState.editor.workspace
  )
  return json
}

window._loadJson = _loadJson
window._dumpJson = _dumpJson
