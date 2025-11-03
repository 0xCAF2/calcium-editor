import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'

const CALCIUM_CLASS_NAME = 'calcium_class'

const calciumClassDefBlock: BlockDefinition = {
  type: CALCIUM_CLASS_NAME,
  message0: 'class %1 (%2): %3 %4',
  args0: [
    {
      type: 'field_input',
      name: 'NAME',
      text: 'MyClass',
    },
    {
      type: 'input_value',
      name: 'SUPERCLASS',
      check: ['calcium_variable', 'calcium_attribute'],
      align: 'RIGHT',
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
  tooltip: tooltipManager.getValue('CALCIUM_CLASS_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumClassDefBlock])
