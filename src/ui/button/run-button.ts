import { CalciumEditor } from "../../editor"
import type { L10N } from "../../l10n"
import { editorState } from "../state"
import { runnerState } from "../state/editor-state"

export function createRunButton(
  l10n: L10N,
  editor: CalciumEditor
): HTMLElement {
  const button = document.createElement("div")
  button.id = "run-button"
  button.textContent = "▶︎ " + l10n.run

  button.onclick = () => {
    editorState.current.to(runnerState, editor)
    editorState.current = runnerState
  }

  return button
}
