import { editorState } from "../state/editor-state"
import { mainState } from "../state/editor-state"

export function openFileDialog(): void {
  const dialog = document.createElement("div")
  dialog.id = "file-dialog"

  const backButton = document.createElement("div")
  backButton.id = "file-dialog-back-button"
  backButton.textContent = "←"
  backButton.onclick = () => {
    editorState.current = mainState
  }
  dialog.appendChild(backButton)

  document.body.appendChild(dialog)
}
