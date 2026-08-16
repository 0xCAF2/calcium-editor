import * as l10n from "."
import "./message"
import "./tooltip"
import "../../generator/calcium"
import "../../generator/pseudo"

import { editorState } from "../../ui/state/editor-state"
import { Caed } from "../../caed"

editorState.l10n = l10n.buildLocalization()

const caed = new Caed()
caed.options = {
  toolbox: l10n.toolbox,
}
const menuDiv = document.createElement("div")
menuDiv.id = "menu"
document.body.appendChild(menuDiv)
const parentDiv = document.createElement("div")
document.body.appendChild(parentDiv)
caed.parent = parentDiv

Object.defineProperty(window, "高さ", {
  set: function (value) {
    caed.height = value
  },
  enumerable: true,
})

Object.defineProperty(window, "ブロック", {
  set: function (value) {
    caed.blocks = value
  },
  enumerable: true,
})

Object.defineProperty(window, "エディタを表示する", {
  get: function () {
    // This getter includes a call to buildEditor() as a side effect to localize
    // the build process.
    return caed.build
  },
  enumerable: true,
})
