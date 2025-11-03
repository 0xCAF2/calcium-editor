import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

export const PSEUDO_RANDOM_NAME = "pseudo_random"

const pseudoRandom: BlockDefinition = {
  type: PSEUDO_RANDOM_NAME,
  message0: "乱数 (  )",
  inputsInline: true,
  output: "calcium_call",
  colour: 210,
  tooltip: tooltipManager.getValue("PSEUDO_RANDOM_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoRandom])
