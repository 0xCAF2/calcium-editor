import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_FOR_NAME = 'calcium_for'

const calciumForBlock: BlockDefinition = {
  type: CALCIUM_FOR_NAME,
  message0: 'for %1 in %2 : %3 %4',
  args0: [
    {
      type: 'input_value',
      name: 'VARS',
      check: ['calcium_variable', 'calcium_comma'],
    },
    {
      type: 'input_value',
      name: 'ITER',
      check: [
        'calcium_variable',
        'calcium_attribute',
        'calcium_subscript',
        'calcium_call',
        'String',
        'Array',
      ],
    },
    {
      type: 'input_dummy',
    },
    {
      type: 'input_statement',
      name: 'STMTS',
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 240,
  tooltip: tooltipManager.getValue('CALCIUM_FOR_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumForBlock])
