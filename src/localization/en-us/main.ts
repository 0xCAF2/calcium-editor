import * as l10n from "."
import "./message"
import "./tooltip"
import "../../generator/calcium/"

import { editorState } from "../../ui/state/editor-state"
import { buildPage } from "../../caed/build-page"

editorState.editor = l10n.buildCalciumEditor(
  document.querySelector("#editor")!,
  "calc(100% - 48px)",
)
editorState.l10n = l10n.buildLocalization()

await buildPage()
