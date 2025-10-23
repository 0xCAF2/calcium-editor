import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_LEN_NAME = "pseudo_len"

const pseudoLen: BlockDefinition = {
  type: PSEUDO_LEN_NAME,
  message0: "要素数 ( %1 )",
  args0: [
    {
      type: "input_value",
      name: "ARRAY",
      check: ["calcium_variable"],
    },
  ],
  inputsInline: true,
  output: "calcium_call",
  colour: 210,
  tooltip: tooltipManager.getValue("PSEUDO_LEN_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoLen])
