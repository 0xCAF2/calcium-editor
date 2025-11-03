import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_BREAK_CONTINUE_NAME = 'calcium_break_continue'

const calciumBreakContinue: BlockDefinition = {
  type: CALCIUM_BREAK_CONTINUE_NAME,
  message0: '%1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'FLOW',
      options: [
        ['break', 'break'],
        ['continue', 'continue'],
      ],
    },
  ],
  previousStatement: null,
  colour: 240,
  tooltip: tooltipManager.getValue('CALCIUM_BREAK_CONTINUE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumBreakContinue])
