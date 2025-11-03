import { editorState, runtimeState } from "./editor-state"

type RunButtonState = {
  to(next: RunButtonState): void
}

export const enabledState: RunButtonState = {
  to(next: RunButtonState): void {
    if (next === disabledState) {
      const runButton = document.querySelector("#run-button") as HTMLElement
      runButton.classList.remove("enabled-run-button")
      runButton.classList.add("disabled-run-button")
      runButton.onclick = null
    }
  },
}

export const disabledState: RunButtonState = {
  to(next: RunButtonState): void {
    if (next === enabledState) {
      const runButton = document.querySelector("#run-button") as HTMLElement
      runButton.classList.remove("disabled-run-button")
      runButton.classList.add("enabled-run-button")
      runButton.onclick = () => {
        editorState.current = runtimeState
      }
    }
  },
}

export class ButtonStateStore {
  private _current: RunButtonState

  get current() {
    return this._current
  }

  set current(nextState: RunButtonState) {
    this._current.to(nextState)
    this._current = nextState
  }

  constructor() {
    this._current = disabledState
  }
}

export const buttonState = new ButtonStateStore()
