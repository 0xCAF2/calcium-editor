import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"
import { allTypesForCheck } from "../type-check/all-types"

const PSEUDO_ASSIGN_ARRAY_NAME = "pseudo_assign_array"
const PSEUDO_ASSIGN_ARRAY_CONTAINER_NAME = "pseudo_assign_array_container"
const PSEUDO_ASSIGN_ARRAY_ITEM_NAME = "pseudo_assign_array_item"

const PSEUDO_ASSIGN_ARRAY_MUTATOR = "pseudo_assign_array_mutator"

const pseudoAssignArrayItem: BlockDefinition = {
  type: PSEUDO_ASSIGN_ARRAY_ITEM_NAME,
  message0: "要素を追加",
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: tooltipManager.getValue("PSEUDO_ASSIGN_ARRAY_ITEM_TOOLTIP"),
  helpUrl: "",
}
const pseudoAssignArrayContainer: BlockDefinition = {
  type: PSEUDO_ASSIGN_ARRAY_CONTAINER_NAME,
  message0: "%1",
  args0: [
    {
      type: "input_statement",
      name: "ITEMS",
    },
  ],
  colour: 330,
  tooltip: tooltipManager.getValue("PSEUDO_ASSIGN_ARRAY_CONTAINER_TOOLTIP"),
  helpUrl: "",
}
Blockly.defineBlocksWithJsonArray([
  pseudoAssignArrayItem,
  pseudoAssignArrayContainer,
])

Blockly.Extensions.registerMutator(
  PSEUDO_ASSIGN_ARRAY_MUTATOR,
  {
    saveExtraState: function () {
      return {
        itemCount: this.itemCount_,
      }
    },

    loadExtraState: function (state: any) {
      this.itemCount_ = state.itemCount
      this.updateShape_()
    },
    compose: function (containerBlock: Blockly.Block) {
      let itemBlock: any = containerBlock.getInputTargetBlock("ITEMS")
      const connections: any[] = []
      while (itemBlock && !itemBlock.isInsertionMarker()) {
        connections.push(itemBlock.valueConnection_)
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
      }
      for (var i = 0; i < this.itemCount_; i++) {
        var connection = this.getInput("ITEM" + i).connection.targetConnection
        if (connection && connections.indexOf(connection) == -1) {
          connection.disconnect()
        }
      }
      this.itemCount_ = connections.length
      this.updateShape_()
      for (let i = 0; i < this.itemCount_; ++i) {
        connections[i]?.reconnect(this, "ITEM" + i)
      }
    },
    decompose: function (workspace: Blockly.Workspace) {
      const containerBlock = workspace.newBlock(
        PSEUDO_ASSIGN_ARRAY_CONTAINER_NAME
      ) as Blockly.BlockSvg
      containerBlock.initSvg()
      let connection = containerBlock.getInput("ITEMS")?.connection
      for (let i = 0; i < this.itemCount_; i++) {
        const itemBlock = workspace.newBlock(
          PSEUDO_ASSIGN_ARRAY_ITEM_NAME
        ) as Blockly.BlockSvg
        itemBlock.initSvg()
        connection?.connect(itemBlock.previousConnection)
        connection = itemBlock.nextConnection
      }
      return containerBlock
    },
    saveConnections: function (containerBlock: Blockly.Block) {
      let itemBlock: any = containerBlock.getInputTargetBlock("ITEMS")
      let i = 0
      while (itemBlock) {
        const input = this.getInput("ITEM" + i)
        itemBlock.valueConnection_ = input && input.connection.targetConnection
        i++
        itemBlock =
          itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
      }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
      if (this.getInput("]")) {
        this.removeInput("]")
      }
      let i
      // Add new inputs.
      for (i = 0; i < this.itemCount_; i++) {
        if (!this.getInput("ITEM" + i)) {
          const input = this.appendValueInput("ITEM" + i)
          input.init()
          input.setCheck(allTypesForCheck)
          if (i !== 0) {
            input.appendField(",")
          }
        }
      }
      this.appendDummyInput("]").appendField("]")
      // Remove deleted inputs.
      while (this.getInput("ITEM" + i)) {
        this.removeInput("ITEM" + i)
        i++
      }
    },
  },
  undefined,
  [PSEUDO_ASSIGN_ARRAY_ITEM_NAME]
)

const pseudoAssignArray: { [key: string]: BlockDefinition } = {
  [PSEUDO_ASSIGN_ARRAY_NAME]: {
    init() {
      this.jsonInit({
        type: "pseudo_assign_array",
        message0: "%1 = [",
        args0: [
          {
            type: "input_value",
            name: "REF",
            check: ["calcium_variable"],
          },
        ],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: tooltipManager.getValue("PSEUDO_ASSIGN_ARRAY_TOOLTIP"),
        helpUrl: "",
        mutator: PSEUDO_ASSIGN_ARRAY_MUTATOR,
      })
      this.itemCount_ = 5
      this.updateShape_()
    },
  },
}

Blockly.common.defineBlocks(pseudoAssignArray)
