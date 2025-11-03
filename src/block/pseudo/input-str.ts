import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_INPUT_STR_NAME = "pseudo_input_str"

const pseudoInputStr: BlockDefinition = {
  type: PSEUDO_INPUT_STR_NAME,
  message0: "%1 =【外部からの入力（文字列）】",
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
  tooltip: tooltipManager.getValue("PSEUDO_INPUT_STR_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoInputStr])
