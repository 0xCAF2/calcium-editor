import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_SUBSCRIPT_NAME = 'calcium_subscript'

const calciumSubscript: BlockDefinition = {
  type: CALCIUM_SUBSCRIPT_NAME,
  message0: '%1 [ %2 ]',
  args0: [
    {
      type: 'input_value',
      name: 'REF',
      check: [
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'Array',
      ],
    },
    {
      type: 'input_value',
      name: 'SUB',
      check: [
        'Number',
        'String',
        'calcium_variable',
        'calcium_attribute',
        'calcium_call',
        'calcium_arithmetic',
        'calcium_slice',
      ],
    },
  ],
  inputsInline: true,
  output: 'calcium_subscript',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_SUBSCRIPT_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumSubscript])
