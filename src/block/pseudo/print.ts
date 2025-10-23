import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { allTypesForCheck } from "../type-check/all-types"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_PRINT_NAME = "pseudo_print"
const PSEUDO_PRINT_ARG_NAME = "pseudo_print_arg"
const PSEUDO_PRINT_MUTATOR_NAME = "pseudo_print_mutator"
const pseudoPrintArgsContainerName = "pseudo_print_args_container"

const pseudoPrintMutatorMixin: any = {
  compose(containerBlock: Blockly.Block) {
    let itemBlock: any = containerBlock.getInputTargetBlock("ARGS")
    const connections: any[] = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    for (let i = 0; i < this.countOfArguments; ++i) {
      const connection = this.getInput("ARG" + i).connection.targetConnection
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect()
      }
    }
    this.countOfArguments = connections.length
    this.updateShape()
    for (let i = 0; i < this.countOfArguments; ++i) {
      connections[i]?.reconnect(this, "ARG" + i)
    }
  },
  decompose(workspace: Blockly.Workspace): Blockly.Block {
    const containerBlock = workspace.newBlock(
      pseudoPrintArgsContainerName
    ) as Blockly.BlockSvg
    containerBlock.initSvg()
    let connection = containerBlock.getInput("ARGS")?.connection
    for (let i = 0; i < this.countOfArguments; ++i) {
      const itemBlock = workspace.newBlock(
        PSEUDO_PRINT_ARG_NAME
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
    if (this.getInput(")")) {
      this.removeInput(")")
    }
    let i = 0
    for (; i < this.countOfArguments; ++i) {
      if (!this.getInput("ARG" + i)) {
        const input = this.appendValueInput("ARG" + i)
        input.init()
        input.setCheck([...allTypesForCheck, "calcium_kwarg"])
        if (i !== 0) {
          input.appendField(",")
        }
      }
    }
    this.appendDummyInput(")").appendField(")")
    while (this.getInput("ARG" + i)) {
      this.removeInput("ARG" + i)
      ++i
    }
  },
  saveConnections(containerBlock: Blockly.Block) {
    let itemBlock: any = containerBlock.getInputTargetBlock("ARGS")
    let i = 0
    while (itemBlock) {
      const input = this.getInput("ARG" + i)
      itemBlock.valueConnection_ = input && input.connection.targetConnection
      ++i
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
  },
}

Blockly.Extensions.registerMutator(
  PSEUDO_PRINT_MUTATOR_NAME,
  pseudoPrintMutatorMixin,
  undefined,
  [PSEUDO_PRINT_ARG_NAME]
)

const pseudoPrintArgBlocks: BlockDefinition[] = [
  {
    type: PSEUDO_PRINT_ARG_NAME,
    message0: "引数を追加",
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 330,
    tooltip: tooltipManager.getValue("PSEUDO_PRINT_ARG_TOOLTIP"),
    helpUrl: "",
  },
  {
    type: pseudoPrintArgsContainerName,
    message0: "%1",
    args0: [
      {
        type: "input_statement",
        name: "ARGS",
      },
    ],
    colour: 330,
    tooltip: tooltipManager.getValue("PSEUDO_PRINT_ARG_CONTAINER_TOOLTIP"),
    helpUrl: "",
  },
]

Blockly.defineBlocksWithJsonArray(pseudoPrintArgBlocks)

const pseudoPrintBlock: { [key: string]: BlockDefinition } = {
  [PSEUDO_PRINT_NAME]: {
    init() {
      this.jsonInit({
        type: PSEUDO_PRINT_NAME,
        message0: "表示する (",
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: tooltipManager.getValue("PSEUDO_PRINT_TOOLTIP"),
        helpUrl: "",
        mutator: PSEUDO_PRINT_MUTATOR_NAME,
      })
      this.countOfArguments = 1
      this.updateShape()
    },
  },
}

Blockly.common.defineBlocks(pseudoPrintBlock)
