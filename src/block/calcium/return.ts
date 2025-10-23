import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'
import { allTypesForCheck } from "../type-check/all-types"

const CALCIUM_RETURN_NAME = 'calcium_return'

const calciumReturnBlock: BlockDefinition = {
  type: CALCIUM_RETURN_NAME,
  message0: 'return %1',
  args0: [
    {
      type: 'input_value',
      name: 'VALUE',
      check: allTypesForCheck,
    },
  ],
  previousStatement: null,
  colour: 240,
  tooltip: tooltipManager.getValue('CALCIUM_RETURN_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumReturnBlock])
