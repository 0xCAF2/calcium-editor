import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_DICT_NAME = 'calcium_dict'

const calciumDictBlock: BlockDefinition = {
  type: CALCIUM_DICT_NAME,
  message0: '{ }',
  output: 'calcium_dict',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_DICT_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumDictBlock])
