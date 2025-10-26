import { CalciumEditor } from "../../editor"
import { editorState } from "../state"
import { mainState } from "../state/editor-state"

export function openFileDialog(editor: CalciumEditor): void {
  const dialog = document.createElement("div")
  dialog.id = "file-dialog"

  const backButton = document.createElement("div")
  backButton.id = "file-dialog-back-button"
  backButton.textContent = "←"
  backButton.onclick = () => {
    editorState.current.to(mainState, editor)
    editorState.current = mainState
  }
  dialog.appendChild(backButton)

  document.body.appendChild(dialog)
}
