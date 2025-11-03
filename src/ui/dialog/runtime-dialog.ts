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

  const errorArea = document.createElement("div")
  errorArea.id = "runtime-error-area"

  const inputField = document.createElement("input")
  inputField.id = "runtime-input-field"
  inputField.type = "text"
  inputField.disabled = true

  const inputButton = document.createElement("div")
  inputButton.id = "runtime-input-button"
  inputButton.className = "runtime-input-button-disabled"
  inputButton.textContent = editorState.l10n.input

  const inputDiv = document.createElement("div")
  inputDiv.style.display = "flex"
  inputDiv.style.justifyContent = "center"
  inputDiv.style.alignItems = "center"
  inputDiv.style.marginTop = "8px"
  inputDiv.appendChild(inputField)
  inputDiv.appendChild(inputButton)

  const outputArea = document.createElement("textarea")
  outputArea.id = "runtime-output-area"
  outputArea.readOnly = true

  menu.appendChild(closeButton)
  dialog.appendChild(menu)
  dialog.appendChild(errorArea)
  dialog.appendChild(inputDiv)
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

export function appendRuntimeError(text: string) {
  const errorArea = document.querySelector(
    "#runtime-error-area"
  ) as HTMLDivElement
  if (errorArea) {
    errorArea.textContent += text
  }
}

export function enableRuntimeInput(placeholder: string) {
  const inputField = document.querySelector(
    "#runtime-input-field"
  ) as HTMLInputElement
  const inputButton = document.querySelector(
    "#runtime-input-button"
  ) as HTMLDivElement

  if (inputField && inputButton) {
    inputField.placeholder = placeholder
    inputButton.className = "runtime-input-button-enabled"
    const onSubmit = () => {
      inputButton.onclick = null
      inputField.onsubmit = null
      inputField.disabled = true
      const input = inputField.value
      inputField.value = ""
      inputField.placeholder = ""
      inputButton.className = "runtime-input-button-disabled"
      editorState.worker.postMessage({ input })
    }
    inputButton.onclick = onSubmit
    inputField.onsubmit = onSubmit
    inputField.disabled = false
  }
}
