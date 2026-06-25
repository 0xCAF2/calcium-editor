import type { LocalizedString } from "../localization"
import { createFileButton } from "./button/file-button"
import { createHelpButton } from "./button/help-button"
import { createRunButton } from "./button/run-button"

export function createMenu(l10n: LocalizedString): void {
  const menu = document.querySelector("#menu") as HTMLElement
  menu.style.display = "flex"
  menu.style.alignItems = "center"
  menu.style.justifyContent = "space-between"
  menu.style.padding = "4px"

  menu.appendChild(createFileButton())
  menu.appendChild(createRunButton(l10n))
  menu.appendChild(createHelpButton(l10n))
}
