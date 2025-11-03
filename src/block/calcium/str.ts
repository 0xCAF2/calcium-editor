import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'
import { sanitizeStr } from "../../util/sanitize-str"

const CALCIUM_STR_NAME = 'calcium_str'

const calciumStr: { [key: string]: BlockDefinition } = {
  [CALCIUM_STR_NAME]: {
    init() {
      this.appendDummyInput()
        .appendField(" ")
        .appendField(
          new Blockly.FieldTextInput('""', function (newValue) {
            return `"${sanitizeStr(newValue)}"`
          }),
          "STR"
        )
        .appendField(" ")
      this.setInputsInline(true)
      this.setOutput(true, "String")
      this.setColour(120)
      this.setTooltip(tooltipManager.getValue("CALCIUM_STR_TOOLTIP"))
    },
  },
}

Blockly.common.defineBlocks(calciumStr)
