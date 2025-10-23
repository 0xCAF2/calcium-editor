import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { parseNumber } from "../../util/parse-number"
import { tooltipManager } from "../../constant-manager"

const CALCIUM_NUMBER_NAME = "calcium_number"

const calciumNumberBlock: { [key: string]: BlockDefinition } = {
  [CALCIUM_NUMBER_NAME]: {
    init() {
      this.appendDummyInput().appendField(
        new Blockly.FieldTextInput("0", function (newValue) {
          try {
            return parseNumber(newValue)
          } catch {
            return null
          }
        }),
        "NUM"
      )
      this.setInputsInline(true)
      this.setOutput(true, "Number")
      this.setColour(120)
      this.setTooltip(tooltipManager.getValue("CALCIUM_NUMBER_TOOLTIP"))
    },
  },
}

Blockly.common.defineBlocks(calciumNumberBlock)
