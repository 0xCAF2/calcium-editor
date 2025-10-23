import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const PSEUDO_ARRAY_NAME = 'pseudo_array'

const pseudoArray: BlockDefinition = {
  type: PSEUDO_ARRAY_NAME,
  message0: '%1 [ %2 ]',
  args0: [
    {
      type: 'input_value',
      name: 'REF',
      check: ['calcium_variable'],
    },
    {
      type: 'input_value',
      name: 'SUB',
      check: ['Number', 'calcium_variable', 'calcium_arithmetic'],
    },
  ],
  inputsInline: true,
  output: 'calcium_subscript',
  colour: 210,
  tooltip: tooltipManager.getValue('PSEUDO_ARRAY_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([pseudoArray])
