import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { messageManager, tooltipManager } from '../../constant-manager'
import { allTypesForCheck } from '../type-check/all-types'
import { CALCIUM_KWARG_NAME } from './kwarg'

const CALCIUM_CALL_NAME = 'calcium_call'
const CALCIUM_CALL_ARG_NAME = 'calcium_call_arg'
const CALCIUM_CALL_ARG_CONTAINER_NAME = 'calcium_call_arg_container'

const CALCIUM_CALL_MUTATOR_NAME = 'calcium_call_mutator'

Blockly.common.defineBlocks({
  [CALCIUM_CALL_NAME]: {
    init() {
      this.jsonInit({
        type: CALCIUM_CALL_NAME,
        message0: '%1',
        args0: [
          {
            type: 'input_value',
            name: 'REF',
            check: ['calcium_variable', 'calcium_attribute'],
          },
        ],
        output: 'calcium_call',
        colour: 120,
        tooltip: tooltipManager.getValue('CALCIUM_CALL_TOOLTIP'),
        helpUrl: '',
        mutator: CALCIUM_CALL_MUTATOR_NAME,
      })
      this.setInputsInline(true)
      this.countOfArguments = 0
      this.updateShape()
    },
  },
})

Blockly.Extensions.registerMutator(
  CALCIUM_CALL_MUTATOR_NAME,
  {
    compose(containerBlock: Blockly.Block) {
      let itemBlock: any = containerBlock.getInputTargetBlock('ARGS')
      const connections: any[] = []
      while (itemBlock) {
        connections.push(itemBlock.valueConnection_)
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
      }
      for (let i = 0; i < this.countOfArguments; ++i) {
        const connection = this.getInput('ARG' + i).connection.targetConnection
        if (connection && connections.indexOf(connection) === -1) {
          connection.disconnect()
        }
      }
      this.countOfArguments = connections.length
      this.updateShape()
      for (let i = 0; i < this.countOfArguments; ++i) {
        connections[i]?.reconnect(this, 'ARG' + i)
      }
    },
    decompose(workspace: Blockly.Workspace) {
      const containerBlock = workspace.newBlock(
        CALCIUM_CALL_ARG_CONTAINER_NAME
      ) as Blockly.BlockSvg
      containerBlock.initSvg()
      let connection = containerBlock.getInput('ARGS')?.connection
      for (let i = 0; i < this.countOfArguments; ++i) {
        const itemBlock = workspace.newBlock(
          CALCIUM_CALL_ARG_NAME
        ) as Blockly.BlockSvg
        itemBlock.initSvg()
        connection?.connect(itemBlock.previousConnection)
        connection = itemBlock.nextConnection
      }
      return containerBlock
    },
    saveExtraState() {
      return {
        countOfArguments: this.countOfArguments,
      }
    },

    loadExtraState(state: any) {
      this.countOfArguments = state['countOfArguments']
      this.updateShape()
    },
    saveConnections(containerBlock: Blockly.Block) {
      let itemBlock = containerBlock.getInputTargetBlock('ARGS') as any
      let i = 0
      while (itemBlock) {
        const input = this.getInput('ARG' + i)
        itemBlock.valueConnection_ = input && input.connection.targetConnection
        ++i
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
      }
    },
    updateShape() {
      if (this.getInput('CLOSE_PAREN')) {
        this.removeInput('CLOSE_PAREN')
      }
      let i
      for (i = 0; i < this.countOfArguments; ++i) {
        if (!this.getInput('ARG' + i)) {
          const input = this.appendValueInput('ARG' + i)
          input.init()
          const checker = allTypesForCheck.concat([CALCIUM_KWARG_NAME])
          input.setCheck(checker)
          if (i === 0) {
            input.appendField('(')
          } else {
            input.appendField(',')
          }
        }
      }
      if (i > 0) {
        const dummy = this.appendDummyInput('CLOSE_PAREN')
        dummy.appendField(')')
      }
      if (i === 0 && !this.getInput('PAREN')) {
        const dummy = this.appendDummyInput('PAREN')
        dummy.appendField('( )')
      } else if (i !== 0 && this.getInput('PAREN')) {
        this.removeInput('PAREN')
      }
      while (this.getInput('ARG' + i)) {
        this.removeInput('ARG' + i)
        ++i
      }
    },
  },
  undefined,
  [CALCIUM_CALL_ARG_NAME]
)

const calciumCallArg: BlockDefinition = {
  type: CALCIUM_CALL_ARG_NAME,
  message0: messageManager.getValue('CALCIUM_CALL_ARG_MESSAGE'),
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_CALL_ARG_TOOLTIP'),
  helpUrl: '',
}

const calciumCallArgContainer: BlockDefinition = {
  type: CALCIUM_CALL_ARG_CONTAINER_NAME,
  message0: '%1',
  args0: [
    {
      type: 'input_statement',
      name: 'ARGS',
    },
  ],
  colour: 120,
  tooltip: tooltipManager.getValue('CALCIUM_CALL_ARG_CONTAINER_TOOLTIP'),
  helpUrl: '',
}

Blockly.defineBlocksWithJsonArray([calciumCallArg, calciumCallArgContainer])
