import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_WHILE_NAME = "pseudo_while"

const pseudoWhile: BlockDefinition = {
  type: PSEUDO_WHILE_NAME,
  message0: "%1 の間繰り返す: %2 %3",
  args0: [
    {
      type: "input_value",
      name: "CONDITION",
      check: [
        "Boolean",
        "calcium_variable",
        "calcium_attribute",
        "calcium_subscript",
        "calcium_call",
        "calcium_arithmetic",
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "DO",
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: tooltipManager.getValue("PSEUDO_WHILE_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoWhile])
