import * as Blockly from "blockly"

import "./message"
import "./tooltip"

import * as Lang from "blockly/msg/ja"
// @ts-ignore
Blockly.setLocale(Lang)
import "../ps-jp"

import { CALCIUM_RENDERER_NAME } from "../../editor/calcium-renderer"
import {
  buildEditor,
  CalciumEditor,
  type CategoryDefinition,
} from "../../editor"

export { buildEditor, CalciumEditor } from "../../editor"
export type { CategoryDefinition } from "../../editor"

export function buildCalciumEditor(
  parent: HTMLElement,
  height?: string
): CalciumEditor {
  return buildEditor({
    parent,
    options: {
      renderer: CALCIUM_RENDERER_NAME,
      categories: categories,
    },
    height,
  })
}

const categories: CategoryDefinition[] = [
  {
    基本: [
      "pseudo_variable",
      "pseudo_number",
      "pseudo_str",
      "pseudo_assignment",
      "pseudo_print",
    ],
  },
  {
    演算: [
      "pseudo_arithmetic",
      "pseudo_relational" /* dummy comment for next newline */,
    ],
  },
  {
    配列: [
      "pseudo_array",
      "pseudo_array_slice",
      "pseudo_assign_array",
      "pseudo_assign_zero",
    ],
  },
  {
    条件分岐: [
      "pseudo_logical",
      "pseudo_not",
      "pseudo_if" /* dummy comment for newline */,
    ],
  },
  {
    繰り返し: [
      "pseudo_for_increment",
      "pseudo_for_decrement",
      "pseudo_while" /* dummy comment for newline */,
    ],
  },
  {
    関数: [
      "pseudo_len",
      "pseudo_int",
      "pseudo_random" /* dummy comment for next newline */,
    ],
  },
  {
    入力: [
      "pseudo_input_int",
      "pseudo_input_str" /* dummy comment for pretty newlines */,
    ],
  },
]
