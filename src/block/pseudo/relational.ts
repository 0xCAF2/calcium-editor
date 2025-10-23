import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_RELATIONAL_NAME = "pseudo_relational"
const pseudoRelational: BlockDefinition = {
  type: PSEUDO_RELATIONAL_NAME,
  message0: "%1 %2 %3",
  args0: [
    {
      type: "input_value",
      name: "LEFT",
      check: [
        "calcium_variable",
        "calcium_attribute",
        "calcium_subscript",
        "calcium_call",
        "calcium_arithmetic",
        "Number",
        "String",
      ],
    },
    {
      type: "field_dropdown",
      name: "OP",
      options: [
        ["==", "=="],
        ["!=", "!="],
        ["<", "<"],
        ["<=", "<="],
        [">", ">"],
        [">=", ">="],
      ],
    },
    {
      type: "input_value",
      name: "RIGHT",
      check: [
        "calcium_variable",
        "calcium_attribute",
        "calcium_subscript",
        "calcium_call",
        "calcium_arithmetic",
        "Number",
        "String",
      ],
    },
  ],
  inputsInline: true,
  output: "Boolean",
  colour: 210,
  tooltip: tooltipManager.getValue("PSEUDO_RELATIONAL_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoRelational])
