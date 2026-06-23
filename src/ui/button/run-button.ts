import type { LocalizedString } from "../../localization"

export function createRunButton(l10n: LocalizedString): HTMLElement {
  const button = document.createElement("div")
  button.id = "run-button"
  button.classList.add("disabled-run-button")
  button.textContent = "▶︎ " + l10n.run

  return button
}
