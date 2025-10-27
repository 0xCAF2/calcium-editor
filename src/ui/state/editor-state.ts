import { CalciumEditor } from "../../editor"
import { openFileDialog } from "../dialog/file-dialog"
import { CalciumEditorNotSetError, InvalidStateTransitionError } from "../error"

export type EditorState = {
  to(next: EditorState): void
}

export const mainState: EditorState = {
  to(next: EditorState): void {
    if (next === runtimeState) {
    } else if (next === fileDialogState) {
      openFileDialog()
    }
  },
}

export const runtimeState: EditorState = {
  to(next: EditorState): void {
    if (next === mainState) {
    } else {
      throw new InvalidStateTransitionError()
    }
  },
}

export const fileDialogState: EditorState = {
  to(next: EditorState): void {
    if (next === mainState) {
      const dialog = document.querySelector("#file-dialog")
      dialog?.remove()
    } else {
      throw new InvalidStateTransitionError()
    }
  },
}

export class EditorStateStore {
  private _current: EditorState

  get current() {
    return this._current
  }

  set current(nextState: EditorState) {
    this._current.to(nextState)
    this._current = nextState
  }

  private _editor: CalciumEditor | null = null

  get editor(): CalciumEditor {
    if (this._editor) {
      return this._editor
    } else {
      throw new CalciumEditorNotSetError()
    }
  }

  set editor(editor: CalciumEditor) {
    this._editor = editor
  }

  constructor() {
    this._current = mainState
  }
}

export const editorState = new EditorStateStore()
