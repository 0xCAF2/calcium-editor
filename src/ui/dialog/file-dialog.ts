import * as Blockly from "blockly"
import { editorState, mainState } from "../state/editor-state"

export function openFileDialog(): void {
  const dialog = document.createElement("div")
  dialog.id = "file-dialog"

  // helper: create simple button-like div
  function createDialogButton(id: string, text: string, onClick: () => void) {
    const btn = document.createElement("div")
    btn.id = id
    btn.textContent = text
    btn.onclick = onClick
    return btn
  }

  // helper: load blocks from a storage key into workspace
  function loadFromKey(key: string) {
    const blockCodeString = localStorage.getItem(key)
    if (blockCodeString) {
      const blockCode = JSON.parse(blockCodeString)
      editorState.isLoadingFile = true
      Blockly.serialization.workspaces.load(
        blockCode,
        editorState.editor.workspace
      )
    }
    editorState.current = mainState
  }

  // helper: create a file item element for a given storage key
  function createFileItem(key: string) {
    const fileItem = document.createElement("div")
    fileItem.className = "file-dialog-file-item"
    fileItem.textContent = key.replace("calcium-editor-", "")
    fileItem.onclick = () => loadFromKey(key)
    return fileItem
  }

  const backButton = createDialogButton("file-dialog-back-button", "←", () => {
    editorState.current = mainState
  })
  dialog.appendChild(backButton)

  const fileList = document.createElement("div")
  fileList.id = "file-dialog-file-list"

  const addButton = createDialogButton("file-dialog-add-button", "+", () => {
    const blockCode = Blockly.serialization.workspaces.save(
      editorState.editor.workspace
    )
    const key = `calcium-editor-${
      editorState.l10n.savedFile
    }-${new Date().toLocaleString()}`
    localStorage.setItem(key, JSON.stringify(blockCode))
    addButton.style.visibility = "hidden"

    // insert the new file at the top of the list
    const fileItem = createFileItem(key)
    fileList.prepend(document.createElement("hr"))
    fileList.prepend(fileItem)
  })
  dialog.appendChild(addButton)

  const filteredKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith(`calcium-editor-${editorState.l10n.savedFile}`)
  )
  filteredKeys.sort().reverse()

  for (const key of filteredKeys) {
    fileList.appendChild(createFileItem(key))
    fileList.appendChild(document.createElement("hr"))
  }

  const allKeys = Object.keys(localStorage).filter((key) =>
    key.startsWith("calcium-editor-")
  )

  if (allKeys.length === 0) {
    const noFileItem = document.createElement("div")
    noFileItem.id = "file-dialog-no-file-item"
    noFileItem.textContent = editorState.l10n.noFiles
    fileList.appendChild(noFileItem)
  }

  // append files except the filtered ones
  for (const key of allKeys) {
    if (!filteredKeys.includes(key)) {
      fileList.appendChild(createFileItem(key))
      fileList.appendChild(document.createElement("hr"))
    }
  }

  dialog.appendChild(fileList)

  document.body.appendChild(dialog)
}

export function closeFileDialog(): void {
  const dialog = document.querySelector("#file-dialog")
  dialog?.remove()
}
