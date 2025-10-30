import { editorState, mainState } from "../state/editor-state"

export function openRuntimeDialog() {
  const dialog = document.createElement("div")
  dialog.id = "runtime-dialog"

  const menu = document.createElement("div")
  menu.style.display = "flex"
  menu.style.justifyContent = "center"
  menu.style.alignItems = "center"

  const closeButton = document.createElement("div")
  closeButton.id = "runtime-dialog-close-button"
  closeButton.textContent = "◼️ " + editorState.l10n.stop
  closeButton.onclick = () => {
    editorState.current = mainState
  }

  const outputArea = document.createElement("textarea")
  outputArea.id = "runtime-output-area"
  outputArea.readOnly = true

  menu.appendChild(closeButton)
  dialog.appendChild(menu)
  dialog.appendChild(outputArea)
  document.body.appendChild(dialog)
}

export function closeRuntimeDialog() {
  const dialog = document.querySelector("#runtime-dialog")
  dialog?.remove()
}

export function appendRuntimeOutput(text: string) {
  const outputArea = document.querySelector(
    "#runtime-output-area"
  ) as HTMLTextAreaElement
  if (outputArea) {
    outputArea.value += text + "\n"
    outputArea.scrollTop = outputArea.scrollHeight
  }
}
