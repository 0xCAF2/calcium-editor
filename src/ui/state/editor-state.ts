import { CalciumEditor } from "../../editor"
import { openFileDialog } from "../dialog/file-dialog"

export type EditorState = {
  to(next: EditorState, editor: CalciumEditor): void
}

export const mainState: EditorState = {
  to(next: EditorState, editor: CalciumEditor): void {
    if (next === runnerState) {
    } else if (next === fileDialogState) {
      openFileDialog(editor)
    }
  },
}

export const runnerState: EditorState = {
  to(next: EditorState): void {
    if (next === mainState) {
    } else {
      throw new InvalidStateTransitionError()
    }
  },
}

export const fileDialogState: EditorState = {
  to(next: EditorState, editor: CalciumEditor): void {
    if (next === mainState) {
      const dialog = document.querySelector("#file-dialog")
      dialog?.remove()
    } else {
      throw new InvalidStateTransitionError()
    }
  },
}

class InvalidStateTransitionError extends Error {}
