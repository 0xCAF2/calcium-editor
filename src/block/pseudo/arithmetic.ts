import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_ARITHMETIC_NAME = "pseudo_arithmetic"

const pseudoArithmetic: BlockDefinition = {
  type: PSEUDO_ARITHMETIC_NAME,
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
        ["+", "+"],
        ["-", "-"],
        ["*", "*"],
        ["/", "/"],
        ["÷", "//"],
        ["%", "%"],
        ["**", "**"],
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
  output: "calcium_arithmetic",
  colour: 210,
  tooltip: tooltipManager.getValue("PSEUDO_ARITHMETIC_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoArithmetic])
