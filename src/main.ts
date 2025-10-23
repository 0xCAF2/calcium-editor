import { ja, en } from "calciumed"
// Detect the user's preferred language
const userLanguage =
  navigator.language || (navigator.languages && navigator.languages[0])

if (userLanguage === "ja-JP" || userLanguage === "ja") {
  ja.buildCalciumEditor(document.getElementById("app")!, "calc(100% - 0px)")
} else {
  en.buildCalciumEditor(document.getElementById("app")!, "calc(100% - 0px)")
}
