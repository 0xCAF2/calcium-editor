import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_NOT_NAME = 'calcium_not'

const calciumNot: BlockDefinition = {
  type: CALCIUM_NOT_NAME,
  message0: 'not %1',
  args0: [
    {
      type: 'input_value',
      name: 'VALUE',
      check: [
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'calcium_call',
        'Boolean',
      ],
    },
  ],
  inputsInline: true,
  output: 'Boolean',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_NOT_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumNot])
