import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_ATTRIBUTE_NAME = 'calcium_attribute'

const calciumAttribute: BlockDefinition = {
  type: CALCIUM_ATTRIBUTE_NAME,
  message0: '%1 . %2',
  args0: [
    {
      type: 'input_value',
      name: 'REF',
      check: ['calcium_variable', 'calcium_attribute', 'String'],
    },
    {
      type: 'field_input',
      name: 'ATTR',
      text: 'name',
    },
  ],
  inputsInline: true,
  output: 'calcium_attribute',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_ATTRIBUTE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumAttribute])
