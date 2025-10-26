import type { L10N } from "./l10n"
import { JaJpL10N } from "./l10n/ja-jp"
import { EnUsL10N } from "./l10n/en-us"
import { createMenu } from "./ui/menu"
import { CalciumEditor } from "./editor"
// Detect the user's preferred language
const userLanguage =
  navigator.language || (navigator.languages && navigator.languages[0])

let l10n: L10N
let calciumEditor: CalciumEditor

if (userLanguage === "ja-JP" || userLanguage === "ja") {
  const ja = await import("./lang/ja-jp")
  calciumEditor = ja.buildCalciumEditor(
    document.querySelector("#editor")!,
    "calc(100% - 48px)"
  )
  l10n = new JaJpL10N()
} else {
  const en = await import("./lang/en-us")
  calciumEditor = en.buildCalciumEditor(
    document.querySelector("#editor")!,
    "calc(100% - 48px)"
  )
  l10n = new EnUsL10N()
}

createMenu(l10n)
