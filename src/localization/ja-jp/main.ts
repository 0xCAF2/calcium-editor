import * as l10n from "."
import "./message"
import "./tooltip"
import "../../generator/calcium/"
import "../../generator/pseudo/"

import { editorState } from "../../ui/state/editor-state"
import { buildPage } from "../../caed/build-page"
import { Caed } from "../../caed"

const caed = new Caed()
caed.parent = document.querySelector("#editor")!
caed.height = "calc(100% - 48px)"
caed.options = {
  categories: l10n.categories,
}
caed.buildEditor()
editorState.editor = caed.editor!

editorState.l10n = l10n.buildLocalization()

await buildPage()
