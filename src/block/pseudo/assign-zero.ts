import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_ASSIGN_ZERO_NAME = "pseudo_assign_zero"

const pseudoAssignZero: BlockDefinition = {
  type: PSEUDO_ASSIGN_ZERO_NAME,
  message0: "%1 のすべての値を0にする",
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
  tooltip: tooltipManager.getValue("PSEUDO_ASSIGN_ZERO_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoAssignZero])
