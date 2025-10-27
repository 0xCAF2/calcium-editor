import type { L10N } from "../../l10n"
import { editorState, runtimeState } from "../state/editor-state"

export function createRunButton(l10n: L10N): HTMLElement {
  const button = document.createElement("div")
  button.id = "run-button"
  button.textContent = "▶︎ " + l10n.run

  button.onclick = () => {
    editorState.current = runtimeState
  }

  return button
}
