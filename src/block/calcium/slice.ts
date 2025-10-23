import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_SLICE_NAME = 'calcium_slice'

const calciumSliceBlock: BlockDefinition = {
  type: CALCIUM_SLICE_NAME,
  message0: '%1 : %2',
  args0: [
    {
      type: 'input_value',
      name: 'START',
      check: [
        'Number',
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'calcium_call',
        'calcium_arithmetic',
      ],
    },
    {
      type: 'input_value',
      name: 'END',
      check: [
        'Number',
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'calcium_call',
        'calcium_arithmetic',
      ],
    },
  ],
  inputsInline: true,
  output: 'calcium_slice',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_SLICE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumSliceBlock])
