import { CalciumEditor } from "../../editor"
import { L10N } from "../../l10n"
import { closeFileDialog, openFileDialog } from "../dialog/file-dialog"
import {
  appendRuntimeError,
  appendRuntimeOutput,
  closeRuntimeDialog,
  enableRuntimeInput,
  openRuntimeDialog,
} from "../dialog/runtime-dialog"
import { CalciumEditorNotSetError, InvalidStateTransitionError } from "../error"
import * as runButton from "./run-button-state"

export type EditorState = {
  to(next: EditorState): void
}

export const mainState: EditorState = {
  to(next: EditorState): void {
    if (next === runtimeState) {
      openRuntimeDialog()
      const code = editorState.editor.code
      editorState.worker.postMessage({ code })
    } else if (next === fileDialogState) {
      openFileDialog()
    }
  },
}

export const runtimeState: EditorState = {
  to(next: EditorState): void {
    if (next === mainState) {
      closeRuntimeDialog()
      runButton.buttonState.current = runButton.disabledState
      editorState.worker.terminate()
      editorState.worker = createWorker()
    } else {
      throw new InvalidStateTransitionError()
    }
  },
}

export const fileDialogState: EditorState = {
  to(next: EditorState): void {
    if (next === mainState) {
      closeFileDialog()
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

  private _l10n: L10N | null = null

  get l10n(): L10N {
    if (this._l10n) {
      return this._l10n
    } else {
      throw new CalciumEditorNotSetError()
    }
  }

  set l10n(l10n: L10N) {
    this._l10n = l10n
  }

  isLoadingFile = false

  worker: Worker

  constructor() {
    this._current = mainState
    this.worker = createWorker()
  }
}

export const editorState = new EditorStateStore()

function createWorker(): Worker {
  const worker = new Worker("./worker.js")
  worker.onmessage = (event) => {
    const message = event.data
    if (message.loaded) {
      runButton.buttonState.current = runButton.enabledState
    } else if (message.output || message.output === "") {
      appendRuntimeOutput(message.output)
    } else if (message.error) {
      appendRuntimeError(message.error.join("\n"))
    } else if (message.input || message.input === "") {
      enableRuntimeInput(message.input)
    }
  }
  return worker
}
