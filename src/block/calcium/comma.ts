import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_COMMA_NAME = 'calcium_comma'

const calciumComma: BlockDefinition = {
  type: CALCIUM_COMMA_NAME,
  message0: '%1, %2',
  args0: [
    {
      type: 'input_value',
      name: 'FIRST',
      check: ['calcium_variable'],
    },
    {
      type: 'input_value',
      name: 'SECOND',
      check: ['calcium_variable'],
    },
  ],
  output: 'calcium_comma',
  inputsInline: true,
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_COMMA_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumComma])