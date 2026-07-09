import * as l10n from "."
import "./message"
import "./tooltip"
import "../../generator"

import { editorState } from "../../ui/state/editor-state"
import { buildPage } from "../../caed/build-page"
import { Caed } from "../../caed"

const caed = new Caed()
caed.parent = document.querySelector("#editor")!
caed.height = "calc(100% - 48px)"
caed.options = {
  toolbox: l10n.toolbox,
  includesPythonCategories: true,
}

editorState.l10n = l10n.buildLocalization()

// This getter includes a call to buildEditor() as a side effect.
caed.build

await buildPage()
