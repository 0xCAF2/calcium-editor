import type { L10N } from "../l10n"
import { createFileButton } from "./button/file-button"
import { createHelpButton } from "./button/help-button"
import { createRunButton } from "./button/run-button"

const menu = document.querySelector("#menu") as HTMLElement
menu.style.display = "flex"
menu.style.alignItems = "center"
menu.style.justifyContent = "space-between"
menu.style.padding = "4px"

export function createMenu(l10n: L10N): void {
  menu.appendChild(createFileButton())
  menu.appendChild(createRunButton(l10n))
  menu.appendChild(createHelpButton(l10n))
}
