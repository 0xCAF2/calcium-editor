import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_EXPR_STMT_NAME = 'calcium_expr_stmt'

const calciumExprStmtBlock: BlockDefinition = {
  type: CALCIUM_EXPR_STMT_NAME,
  message0: '%1',
  args0: [
    {
      type: 'input_value',
      name: 'CALL',
      check: ['calcium_call'],
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 240,
  tooltip: tooltipManager.getValue('CALCIUM_EXPR_STMT_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumExprStmtBlock])
