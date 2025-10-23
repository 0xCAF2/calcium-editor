import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const PSEUDO_ARRAY_SLICE_NAME = 'pseudo_array_slice'

const pseudoArraySlice: BlockDefinition = {
  type: PSEUDO_ARRAY_SLICE_NAME,
  message0: '%1 [ %2 , %3 ]',
  args0: [
    {
      type: 'input_value',
      name: 'REF',
      check: ['calcium_variable'],
    },
    {
      type: 'input_value',
      name: 'START',
      check: ['Number', 'calcium_variable', 'calcium_arithmetic'],
    },
    {
      type: 'input_value',
      name: 'END',
      check: ['Number', 'calcium_variable', 'calcium_arithmetic'],
    },
  ],
  inputsInline: true,
  output: 'calcium_subscript',
  colour: 210,
  tooltip: tooltipManager.getValue('PSEUDO_ARRAY_SLICE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([pseudoArraySlice])
