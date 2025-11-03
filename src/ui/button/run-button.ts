import type { L10N } from "../../l10n"

export function createRunButton(l10n: L10N): HTMLElement {
  const button = document.createElement("div")
  button.id = "run-button"
  button.classList.add("disabled-run-button")
  button.textContent = "▶︎ " + l10n.run

  return button
}
