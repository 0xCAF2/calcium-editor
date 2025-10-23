import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_LOGICAL_NAME = 'calcium_logical'

const calciumLogical: BlockDefinition = {
  type: CALCIUM_LOGICAL_NAME,
  message0: '%1 %2 %3',
  args0: [
    {
      type: 'input_value',
      name: 'LEFT',
      check: [
        'Boolean',
        'calcium_variable',
        'calcium_attribute',
        'calcium_call',
        'calcium_subscript',
        'calcium_arithmetic',
      ],
    },
    {
      type: 'field_dropdown',
      name: 'OP',
      options: [
        ['and', 'and'],
        ['or', 'or'],
      ],
    },
    {
      type: 'input_value',
      name: 'RIGHT',
      check: [
        'Boolean',
        'calcium_variable',
        'calcium_attribute',
        'calcium_call',
        'calcium_subscript',
        'calcium_arithmetic',
      ],
    },
  ],
  inputsInline: true,
  output: 'Boolean',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_LOGICAL_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumLogical])
