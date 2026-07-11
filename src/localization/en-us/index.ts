import * as Blockly from "blockly"
import "./message"
import "./tooltip"
import * as Lang from "blockly/msg/en"
import type { LocalizedString } from ".."
import "../../generator/calcium"

// @ts-ignore
Blockly.setLocale(Lang)

export class EnUsLocalization implements LocalizedString {
  helpUrl = "https://help.caed.app/"

  savedFile = "Saved file"
  noFiles = "No files saved."

  run = "Run"
  stop = "Stop"

  input = "Input"
}

export function buildLocalization(): LocalizedString {
  return new EnUsLocalization()
}

export const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Core",
      contents: [
        {
          kind: "block",
          type: "calcium_variable",
        },
        {
          kind: "block",
          type: "calcium_number",
        },
        {
          kind: "block",
          type: "calcium_str",
        },
        {
          kind: "block",
          type: "calcium_assignment",
        },
        {
          kind: "block",
          type: "calcium_print",
        },
      ],
    },
    {
      kind: "category",
      name: "List",
      contents: [
        {
          kind: "block",
          type: "calcium_list",
        },
        {
          kind: "block",
          type: "calcium_subscript",
        },
        {
          kind: "block",
          type: "calcium_slice",
        },
      ],
    },
    {
      kind: "category",
      name: "Logic",
      contents: [
        {
          kind: "block",
          type: "calcium_arithmetic",
        },
        {
          kind: "block",
          type: "calcium_relational",
        },
        {
          kind: "block",
          type: "calcium_logical",
        },
        {
          kind: "block",
          type: "calcium_not",
        },
        {
          kind: "block",
          type: "calcium_if",
        },
      ],
    },
    {
      kind: "category",
      name: "Loop",
      contents: [
        {
          kind: "block",
          type: "calcium_for",
        },
        {
          kind: "block",
          type: "calcium_while",
        },
        {
          kind: "block",
          type: "calcium_break_continue" /* dummy comment for newline */,
        },
      ],
    },
    {
      kind: "category",
      name: "Function",
      contents: [
        {
          kind: "block",
          type: "calcium_call",
        },
        {
          kind: "block",
          type: "calcium_expr_stmt",
        },
        {
          kind: "block",
          type: "calcium_def",
        },
        {
          kind: "block",
          type: "calcium_return",
        },
      ],
    },
  ],
}
