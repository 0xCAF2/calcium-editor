import * as Blockly from "blockly"

import "./message"
import "./tooltip"

import * as Lang from "blockly/msg/en"

// @ts-ignore
Blockly.setLocale(Lang)

import { buildEditor, CalciumEditor, CategoryDefinition } from "../../editor"
export { buildEditor, CalciumEditor } from "../../editor"
export type { CategoryDefinition } from "../../editor"

export function buildCalciumEditor(
  parent: HTMLElement,
  height?: string
): CalciumEditor {
  return buildEditor({
    parent,
    options: {
      categories: categories,
    },
    height,
  })
}

const categories: CategoryDefinition[] = [
  {
    Basic: [
      "calcium_variable",
      "calcium_number",
      "calcium_str",
      "calcium_assignment",
      "calcium_print",
    ],
  },
  {
    Logic: [
      "calcium_arithmetic",
      "calcium_relational",
      "calcium_logical",
      "calcium_not",
      "calcium_if",
    ],
  },
  {
    Loop: [
      "calcium_for",
      "calcium_while",
      "calcium_break_continue" /* dummy for newline */,
    ],
  },
  {
    Functions: [
      "calcium_call",
      "calcium_expr_stmt",
      "calcium_def",
      "calcium_return",
    ],
  },
]
