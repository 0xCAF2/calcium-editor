import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_INPUT_INT_NAME = "pseudo_input_int"

const pseudoInputInt: BlockDefinition = {
  type: PSEUDO_INPUT_INT_NAME,
  message0: "%1 =【外部からの入力（数）】",
  args0: [
    {
      type: "input_value",
      name: "REF",
      check: ["calcium_variable"],
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: tooltipManager.getValue("PSEUDO_INPUT_INT_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoInputInt])
