import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_VARIABLE_NAME = 'calcium_variable'

const calciumVariable: BlockDefinition = {
  type: CALCIUM_VARIABLE_NAME,
  message0: '%1',
  args0: [
    {
      type: 'field_input',
      name: 'NAME',
      text: 'self',
    },
  ],
  inputsInline: true,
  output: 'calcium_variable',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_VARIABLE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumVariable])
