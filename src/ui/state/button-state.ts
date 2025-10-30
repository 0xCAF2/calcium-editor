import { editorState, runtimeState } from "./editor-state"

export type ButtonState = {
  to(next: ButtonState): void
}

export const enabledState: ButtonState = {
  to(next: ButtonState): void {
    if (next === disabledState) {
      const runButton = document.querySelector("#run-button") as HTMLElement
      runButton.classList.remove("enabled-run-button")
      runButton.classList.add("disabled-run-button")
      runButton.onclick = null
    }
  },
}

export const disabledState: ButtonState = {
  to(next: ButtonState): void {
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
  private _current: ButtonState

  get current() {
    return this._current
  }

  set current(nextState: ButtonState) {
    this._current.to(nextState)
    this._current = nextState
  }

  constructor() {
    this._current = disabledState
  }
}

export const buttonState = new ButtonStateStore()
