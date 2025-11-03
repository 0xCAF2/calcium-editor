import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_NONE_NAME = 'calcium_none'

const calciumNone: BlockDefinition = {
  type: CALCIUM_NONE_NAME,
  message0: 'None',
  output: 'calcium_none',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_NONE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumNone])
