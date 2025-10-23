import type { L10N } from "./l10n"
import { JaJpL10N } from "./l10n/ja-jp"
import { EnUsL10N } from "./l10n/en-us"
import { createMenu } from "./ui/menu"
// Detect the user's preferred language
const userLanguage =
  navigator.language || (navigator.languages && navigator.languages[0])

let l10n: L10N

if (userLanguage === "ja-JP" || userLanguage === "ja") {
  const ja = await import("./lang/ja-jp")
  ja.buildCalciumEditor(document.querySelector("#editor")!, "calc(100% - 48px)")
  l10n = new JaJpL10N()
} else {
  const en = await import("./lang/en-us")
  en.buildCalciumEditor(document.querySelector("#editor")!, "calc(100% - 48px)")
  l10n = new EnUsL10N()
}

createMenu(l10n)
