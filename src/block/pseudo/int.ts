import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_INT_NAME = "pseudo_int"

const pseudoInt: BlockDefinition = {
  type: PSEUDO_INT_NAME,
  message0: "整数 ( %1 )",
  args0: [
    {
      type: "input_value",
      name: "INT",
      check: ["calcium_variable", "calcium_subscript", "calcium_arithmetic"],
    },
  ],
  inputsInline: true,
  output: "calcium_call",
  colour: 210,
  tooltip: tooltipManager.getValue("PSEUDO_INT_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoInt])
