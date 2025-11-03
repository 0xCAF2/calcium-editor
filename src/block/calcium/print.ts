import * as Blockly from 'blockly'
// @ts-ignore
import { BlockDefinition } from 'blockly/core/blocks'
import { allTypesForCheck } from '../type-check/all-types'
import { messageManager, tooltipManager } from '../../constant-manager'

const CALCIUM_PRINT_NAME = 'calcium_print'
const CALCIUM_PRINT_ARG_NAME = 'calcium_print_arg'
const CALCIUM_PRINT_MUTATOR_NAME = 'calcium_print_mutator'
const calciumPrintArgsContainerName = 'calcium_print_args_container'

const calciumPrintMutatorMixin: any = {
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
  decompose(workspace: Blockly.Workspace): Blockly.Block {
    const containerBlock = workspace.newBlock(
      calciumPrintArgsContainerName
    ) as Blockly.BlockSvg
    containerBlock.initSvg()
    let connection = containerBlock.getInput('ARGS')?.connection
    for (let i = 0; i < this.countOfArguments; ++i) {
      const itemBlock = workspace.newBlock(
        CALCIUM_PRINT_ARG_NAME
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
    this.countOfArguments = state.countOfArguments
    this.updateShape()
  },
  updateShape() {
    if (this.getInput(')')) {
      this.removeInput(')')
    }
    let i = 0
    for (; i < this.countOfArguments; ++i) {
      if (!this.getInput('ARG' + i)) {
        const input = this.appendValueInput('ARG' + i)
        input.init()
        input.setCheck([...allTypesForCheck, 'calcium_kwarg'])
        if (i !== 0) {
          input.appendField(',')
        }
      }
    }
    this.appendDummyInput(')').appendField(')')
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i)
      ++i
    }
  },
  saveConnections(containerBlock: Blockly.Block) {
    let itemBlock: any = containerBlock.getInputTargetBlock('ARGS')
    let i = 0
    while (itemBlock) {
      const input = this.getInput('ARG' + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      ++i
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
}

Blockly.Extensions.registerMutator(
  CALCIUM_PRINT_MUTATOR_NAME,
  calciumPrintMutatorMixin,
  undefined,
  [CALCIUM_PRINT_ARG_NAME]
)

const calciumPrintArgBlocks: BlockDefinition[] = [
  {
    type: CALCIUM_PRINT_ARG_NAME,
    message0: messageManager.getValue('CALCIUM_PRINT_ARG_MESSAGE'),
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: tooltipManager.getValue('CALCIUM_PRINT_ARG_TOOLTIP'),
    helpUrl: '',
  },
  {
    type: calciumPrintArgsContainerName,
    message0: '%1',
    args0: [
      {
        type: 'input_statement',
        name: 'ARGS',
      },
    ],
    colour: 240,
    tooltip: '',
    helpUrl: '',
  },
]

Blockly.defineBlocksWithJsonArray(calciumPrintArgBlocks)

const calciumPrintBlock: { [key: string]: BlockDefinition } = {
  [CALCIUM_PRINT_NAME]: {
    init() {
      this.jsonInit({
        type: CALCIUM_PRINT_NAME,
        message0: 'print (',
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: 240,
        tooltip: tooltipManager.getValue('CALCIUM_PRINT_TOOLTIP'),
        helpUrl: '',
        mutator: CALCIUM_PRINT_MUTATOR_NAME,
      })
      this.countOfArguments = 1
      this.updateShape()
    },
  },
}

Blockly.common.defineBlocks(calciumPrintBlock)
