import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_RELATIONAL_NAME = 'calcium_relational'

const calciumRelational: BlockDefinition = {
  type: CALCIUM_RELATIONAL_NAME,
  message0: '%1 %2 %3',
  args0: [
    {
      type: 'input_value',
      name: 'LEFT',
      check: [
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'calcium_call',
        'calcium_arithmetic',
        'Number',
        'String',
      ],
    },
    {
      type: 'field_dropdown',
      name: 'OP',
      options: [
        ['==', '=='],
        ['!=', '!='],
        ['<', '<'],
        ['<=', '<='],
        ['>', '>'],
        ['>=', '>='],
        ['in', 'in'],
        ['not in', 'not in'],
      ],
    },
    {
      type: 'input_value',
      name: 'RIGHT',
      check: [
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'calcium_call',
        'calcium_arithmetic',
        'Number',
        'String',
        'calcium_none',
      ],
    },
  ],
  inputsInline: true,
  output: 'Boolean',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_RELATIONAL_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumRelational])
