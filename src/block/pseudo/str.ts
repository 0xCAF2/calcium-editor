import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"
import { sanitizeStr } from "../../util/sanitize-str"

const PSEUDO_STR_NAME = "pseudo_str"

const pseudoStr: { [key: string]: BlockDefinition } = {
  [PSEUDO_STR_NAME]: {
    init() {
      this.appendDummyInput()
        .appendField("文字列 ")
        .appendField(
          new Blockly.FieldTextInput('""', function (newValue) {
            return `"${sanitizeStr(newValue)}"`
          }),
          "STR"
        )
      this.setInputsInline(true)
      this.setOutput(true, "String")
      this.setColour(210)
      this.setTooltip(tooltipManager.getValue("PSEUDO_STR_TOOLTIP"))
    },
  },
}

Blockly.common.defineBlocks(pseudoStr)
