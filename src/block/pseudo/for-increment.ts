import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_FOR_INCREMENT_NAME = "pseudo_for_increment"

const pseudoForIncrement: BlockDefinition = {
  type: PSEUDO_FOR_INCREMENT_NAME,
  message0: "%1 を %2 から %3 まで %4 ずつ増やしながら %5 繰り返す %6",
  args0: [
    {
      type: "input_value",
      name: "VAR",
      check: ["calcium_variable"],
    },
    {
      type: "input_value",
      name: "START",
      check: [
        "Number",
        "calcium_variable",
        "calcium_attribute",
        "calcium_subscript",
        "calcium_arithmetic",
      ],
    },
    {
      type: "input_value",
      name: "STOP",
      check: [
        "Number",
        "calcium_variable",
        "calcium_attribute",
        "calcium_subscript",
        "calcium_arithmetic",
      ],
    },
    {
      type: "input_value",
      name: "STEP",
      check: [
        "Number",
        "calcium_variable",
        "calcium_attribute",
        "calcium_subscript",
        "calcium_arithmetic",
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "STMTS",
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: tooltipManager.getValue("PSEUDO_FOR_INCREMENT_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoForIncrement])
