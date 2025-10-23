import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_NOT_NAME = "pseudo_not"

const pseudoNot: BlockDefinition = {
  type: PSEUDO_NOT_NAME,
  message0: "not %1",
  args0: [
    {
      type: "input_value",
      name: "VALUE",
      check: [
        "calcium_variable",
        "calcium_attribute",
        "calcium_subscript",
        "calcium_call",
        "Boolean",
      ],
    },
  ],
  inputsInline: true,
  output: "Boolean",
  colour: 210,
  tooltip: tooltipManager.getValue("PSEUDO_NOT_TOOLTIP"),
  helpUrl: "",
}

Blockly.defineBlocksWithJsonArray([pseudoNot])
