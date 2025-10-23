import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_BOOLEAN_NAME = 'calcium_boolean'

const calciumBoolean: BlockDefinition = {
  type: CALCIUM_BOOLEAN_NAME,
  message0: '%1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'VALUE',
      options: [
        ['True', 'true'],
        ['False', 'false'],
      ],
    },
  ],
  output: 'Boolean',
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_BOOLEAN_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumBoolean])
