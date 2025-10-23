import { ja, en } from "calciumed"
import type { L10N } from "./l10n"
import { JaJpL10N } from "./l10n/ja-jp"
import { EnUsL10N } from "./l10n/en-us"
import { createMenu } from "./ui/menu"
// Detect the user's preferred language
const userLanguage =
  navigator.language || (navigator.languages && navigator.languages[0])

let l10n: L10N

if (userLanguage === "ja-JP" || userLanguage === "ja") {
  ja.buildCalciumEditor(document.querySelector("#editor")!, "calc(100% - 48px)")
  l10n = new JaJpL10N()
} else {
  en.buildCalciumEditor(document.querySelector("#editor")!, "calc(100% - 48px)")
  l10n = new EnUsL10N()
}

createMenu(l10n)
