import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_WHILE_NAME = 'calcium_while'

const calciumWhile: BlockDefinition = {
  type: CALCIUM_WHILE_NAME,
  message0: 'while %1 : %2 %3',
  args0: [
    {
      type: 'input_value',
      name: 'CONDITION',
      check: [
        'Boolean',
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'calcium_call',
        'calcium_arithmetic',
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_statement',
      name: 'DO',
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 240,
  tooltip: tooltipManager.getValue('CALCIUM_WHILE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumWhile])
