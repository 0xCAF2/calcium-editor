import { CalciumEditor } from "../../editor"
import { editorState } from "../state"
import { fileDialogState } from "../state/editor-state"

export function createFileButton(editor: CalciumEditor): HTMLElement {
  const button = document.createElement("div")
  button.id = "file-button"

  // create humberger icon with three lines
  for (let i = 0; i < 3; i++) {
    const line = document.createElement("div")
    line.className = "line"
    button.appendChild(line)
  }

  button.onclick = () => {
    editorState.current.to(fileDialogState, editor)
    editorState.current = fileDialogState
  }

  return button
}
