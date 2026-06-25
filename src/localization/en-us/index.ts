import * as Blockly from "blockly"
import "./message"
import "./tooltip"
import * as Lang from "blockly/msg/en"
import type { LocalizedString } from ".."
import { CategoryDefinition } from "../../editor"
import "../../generator/calcium"

// @ts-ignore
Blockly.setLocale(Lang)

export class EnUsLocalization implements LocalizedString {
  helpUrl = "https://help.caed.app/en-us/"

  savedFile = "Saved file"
  noFiles = "No files saved."

  run = "Run"
  stop = "Stop"

  input = "Input"
}

export function buildLocalization(): LocalizedString {
  return new EnUsLocalization()
}

export const categories: CategoryDefinition[] = [
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
    List: [
      "calcium_list",
      "calcium_subscript",
      "calcium_slice" /* dummy comment for newline */,
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
      "calcium_break_continue" /* dummy comment for newline */,
    ],
  },
  {
    Function: [
      "calcium_call",
      "calcium_expr_stmt",
      "calcium_def",
      "calcium_return",
    ],
  },
]
