import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const PSEUDO_VARIABLE_NAME = 'pseudo_variable'

const pseudoVariable: BlockDefinition = {
  type: PSEUDO_VARIABLE_NAME,
  message0: '変数 %1',
  args0: [
    {
      type: 'field_input',
      name: 'NAME',
      text: 'i',
    },
  ],
  inputsInline: true,
  output: 'calcium_variable',
  colour: 210,
  tooltip: tooltipManager.getValue('PSEUDO_VARIABLE_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([pseudoVariable])
