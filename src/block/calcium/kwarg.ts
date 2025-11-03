import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'
import { allTypesForCheck } from '../type-check/all-types'

// used by calcium_call
export const CALCIUM_KWARG_NAME = 'calcium_kwarg'

const calciumKwarg: BlockDefinition = {
  type: CALCIUM_KWARG_NAME,
  message0: '%1 = %2',
  args0: [
    {
      type: 'field_input',
      name: 'NAME',
      text: 'end',
    },
    {
      type: 'input_value',
      name: 'VALUE',
      check: allTypesForCheck,
    },
  ],
  inputsInline: true,
  output: CALCIUM_KWARG_NAME,
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_KWARG_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumKwarg])
