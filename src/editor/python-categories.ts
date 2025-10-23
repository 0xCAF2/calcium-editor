import * as Blockly from "blockly"
import "../block/calcium"

export const pythonCategories: Blockly.utils.toolbox.ToolboxItemInfo[] = [
  {
    kind: "category",
    name: "Python A",
    contents: [
      {
        kind: "block",
        type: "calcium_variable",
      },
      {
        kind: "block",
        type: "calcium_str",
      },
      {
        kind: "block",
        type: "calcium_number",
      },
      {
        kind: "block",
        type: "calcium_list",
      },
      {
        kind: "block",
        type: "calcium_dict",
      },
      {
        kind: "block",
        type: "calcium_attribute",
      },
      {
        kind: "block",
        type: "calcium_call",
      },
      {
        kind: "block",
        type: "calcium_subscript",
      },
      {
        kind: "block",
        type: "calcium_arithmetic",
      },
      {
        kind: "block",
        type: "calcium_boolean",
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
        type: "calcium_kwarg",
      },
      {
        kind: "block",
        type: "calcium_slice",
      },
      {
        kind: "block",
        type: "calcium_comma",
      },
      {
        kind: "block",
        type: "calcium_none",
      },
    ],
  },
  {
    kind: "category",
    name: "Python B",
    contents: [
      {
        kind: "block",
        type: "calcium_print",
      },
      {
        kind: "block",
        type: "calcium_assignment",
      },
      {
        kind: "block",
        type: "calcium_expr_stmt",
      },
      {
        kind: "block",
        type: "calcium_if",
      },
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
        type: "calcium_break_continue",
      },
      {
        kind: "block",
        type: "calcium_return",
      },
      {
        kind: "block",
        type: "calcium_def",
      },
      {
        kind: "block",
        type: "calcium_def_method",
      },
      {
        kind: "block",
        type: "calcium_class",
      },
      {
        kind: "block",
        type: "calcium_import",
      },
    ],
  },
]
