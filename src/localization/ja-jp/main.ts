import * as l10n from "."
import "./message"
import "./tooltip"
import "../../generator/calcium/"
import "../../generator/pseudo/"

import { editorState } from "../../ui/state/editor-state"
import { buildCaed } from "../../caed/build-caed"

editorState.editor = l10n.buildCalciumEditor(
  document.querySelector("#editor")!,
  "calc(100% - 48px)",
)
editorState.l10n = l10n.buildLocalization()

await buildCaed()
