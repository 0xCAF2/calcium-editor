import type { L10N } from "../l10n"
import "./run-button"

const menu = document.querySelector("#menu") as HTMLElement
menu.style.display = "flex"
menu.style.alignItems = "center"
menu.style.justifyContent = "space-between"
menu.style.padding = "4px"

export function createMenu(l10n: L10N) {
  const fileButton = document.createElement("button") as HTMLElement
  fileButton.id = "file-button"
  fileButton.textContent = "三"
  menu.appendChild(fileButton)

  const runButton = document.createElement("button") as HTMLElement
  runButton.id = "run-button"
  runButton.textContent = l10n.run
  menu.appendChild(runButton)

  const helpButton = document.createElement("button") as HTMLElement
  helpButton.id = "help-button"
  helpButton.textContent = "？"
  menu.appendChild(helpButton)
}
