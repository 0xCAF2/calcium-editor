import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { tooltipManager } from '../../constant-manager'
import { allTypesForCheck } from "../type-check/all-types"

const PSEUDO_ASSIGNMENT_NAME = 'pseudo_assignment'

const pseudoAssignment: BlockDefinition = {
  type: PSEUDO_ASSIGNMENT_NAME,
  message0: '%1 = %2',
  args0: [
    {
      type: 'input_value',
      name: 'REF',
      check: ['calcium_variable', 'calcium_attribute', 'calcium_subscript'],
    },
    {
      type: 'input_value',
      name: 'VALUE',
      check: allTypesForCheck,
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: tooltipManager.getValue('PSEUDO_ASSIGNMENT_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([pseudoAssignment])