import * as Blockly from 'blockly'

import { parseNumber } from '../../util/parse-number'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const PSEUDO_NUMBER_NAME = 'pseudo_number'

Blockly.common.defineBlocks({
  [PSEUDO_NUMBER_NAME]: {
    init() {
      const dummyInput = this.appendDummyInput()
      dummyInput.appendField('数値 ')
      dummyInput.appendField(
        new Blockly.FieldTextInput('10', function (newValue) {
          try {
            const parsedNum = parseNumber(newValue)
            return parsedNum
          } catch {
            return null
          }
        }),
        'NUM'
      )
      this.setInputsInline(true)
      this.setOutput(true, 'Number')
      this.setColour(210)
      this.setTooltip(tooltipManager.getValue('PSEUDO_NUMBER_TOOLTIP'))
    },
  },
})