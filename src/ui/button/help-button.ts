import type { L10N } from "../../l10n"

export function createHelpButton(l10n: L10N): HTMLElement {
  const button = document.createElement("div")
  button.id = "help-button"

  const helpLink = document.createElement("a")
  helpLink.href = l10n.helpUrl
  helpLink.target = "_blank"
  helpLink.textContent = "?"
  helpLink.style.width = "100%"
  helpLink.style.height = "100%"
  helpLink.style.display = "flex"
  helpLink.style.alignItems = "center"
  helpLink.style.justifyContent = "center"
  helpLink.style.textDecoration = "none"
  helpLink.style.color = "inherit"

  button.appendChild(helpLink)
  return button
}
