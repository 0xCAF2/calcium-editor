import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_IMPORT_NAME = 'calcium_import'

const calciumImportBlock: BlockDefinition = {
  type: CALCIUM_IMPORT_NAME,
  message0: 'import %1',
  args0: [
    {
      type: 'field_input',
      name: 'NAME',
      text: 'random',
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 240,
  tooltip: tooltipManager.getValue('CALCIUM_IMPORT_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumImportBlock])
