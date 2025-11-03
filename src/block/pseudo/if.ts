import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { tooltipManager } from "../../constant-manager"

const PSEUDO_IF_NAME = "pseudo_if"
const PSEUDO_IF_CONTAINER_NAME = "pseudo_if_container"
const PSEUDO_IF_ELIF_NAME = "pseudo_if_elif"
const PSEUDO_IF_ELSE_NAME = "pseudo_if_else"

const PSEUDO_IF_MUTATOR_NAME = "pseudo_if_mutator"

const pseudoIfMutatorMixin: any = {
  saveExtraState(): any {
    return {
      elifCount: this.elifCount_,
      elseCount: this.elseCount_,
    }
  },
  loadExtraState(state: any) {
    this.elifCount_ = state.elifCount
    this.elseCount_ = state.elseCount
    this.rebuildShape_()
  },
  compose(containerBlock: Blockly.Block) {
    let clauseBlock: any = containerBlock.nextConnection?.targetBlock()
    this.elifCount_ = 0
    this.elseCount_ = 0
    const valueConnections: (Blockly.Block | null)[] = [null]
    const statementConnections: (Blockly.Block | null)[] = [null]
    let elseStatementConnection: any = null

    while (clauseBlock && !clauseBlock.isInsertionMarker()) {
      switch (clauseBlock.type) {
        case PSEUDO_IF_ELIF_NAME:
          this.elifCount_++
          valueConnections.push(clauseBlock.valueConnection_)
          statementConnections.push(clauseBlock.statementConnection_)
          break
        case PSEUDO_IF_ELSE_NAME:
          this.elseCount_++
          elseStatementConnection = clauseBlock.statementConnection_
          break
        default:
          throw Error("Unknown block type." + clauseBlock.type)
      }
      clauseBlock =
        clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock()
    }
    this.updateShape_()
    this.reconnectChildBlocks_(
      valueConnections,
      statementConnections,
      elseStatementConnection
    )
  },
  decompose(workspace: Blockly.Workspace) {
    const containerBlock = workspace.newBlock(
      PSEUDO_IF_CONTAINER_NAME
    ) as Blockly.BlockSvg
    containerBlock.initSvg()
    let connection = containerBlock.nextConnection
    for (let i = 1; i < this.elifCount_ + 1; ++i) {
      const elifBlock = workspace.newBlock(
        PSEUDO_IF_ELIF_NAME
      ) as Blockly.BlockSvg
      elifBlock.initSvg()
      connection.connect(elifBlock.previousConnection)
      connection = elifBlock.nextConnection
    }
    if (this.elseCount_) {
      const elseBlock = workspace.newBlock(
        PSEUDO_IF_ELSE_NAME
      ) as Blockly.BlockSvg
      elseBlock.initSvg()
      connection.connect(elseBlock.previousConnection)
    }
    return containerBlock
  },
  rebuildShape_() {
    const valueConnections: (Blockly.Block | null)[] = []
    const statementConnections: (Blockly.Block | null)[] = []
    let elseStatementConnection: any = null

    if (this.getInput("ELSE")) {
      elseStatementConnection =
        this.getInput("ELSE").connection.targetConnection
    }

    let i = 1
    let inputIf: any
    while ((inputIf = this.getInput("IF" + i))) {
      const inputDo = this.getInput("DO" + i)
      valueConnections.push(inputIf.connection.targetConnection)
      statementConnections.push(inputDo.connection.targetConnection)
      i++
    }
    this.updateShape_()
    this.reconnectChildBlocks_(
      valueConnections,
      statementConnections,
      elseStatementConnection
    )
  },
  reconnectChildBlocks_(
    valueConnections: (Blockly.RenderedConnection | null)[],
    statementConnections: (Blockly.RenderedConnection | null)[],
    elseStatementConnection: Blockly.RenderedConnection | null
  ) {
    for (let i = 1; i < this.elifCount_ + 1; ++i) {
      valueConnections[i]?.reconnect(this, "IF" + i)
      statementConnections[i]?.reconnect(this, "DO" + i)
    }
    elseStatementConnection?.reconnect(this, "ELSE")
  },
  saveConnections(containerBlock: Blockly.Block) {
    let clauseBlock = containerBlock.nextConnection?.targetBlock() as any
    let i = 1
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case PSEUDO_IF_ELIF_NAME:
          const inputIf = this.getInput("IF" + i)
          const inputDo = this.getInput("DO" + i)
          clauseBlock.valueConnection_ =
            inputIf && inputIf.connection.targetConnection
          clauseBlock.statementConnection_ =
            inputDo && inputDo.connection.targetConnection
          ++i
          break
        case PSEUDO_IF_ELSE_NAME:
          const elseDo = this.getInput("ELSE")
          clauseBlock.statementConnection_ =
            elseDo && elseDo.connection.targetConnection
          break
        default:
          throw Error("Unknown block type.")
      }
      clauseBlock =
        clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock()
    }
  },
  /**
   * @this {Blockly.Block}
   */
  updateShape_() {
    // Delete everything
    if (this.getInput("ELSE")) {
      this.removeInput("ELSE")
      this.removeInput("ELSE_LABEL")
    }
    let i = 1
    while (this.getInput("IF" + i)) {
      this.removeInput("IF" + i)
      this.removeInput("ELIF" + i)
      this.removeInput("DO" + i)
      ++i
    }
    // Rebuild block
    for (let i = 1; i < this.elifCount_ + 1; ++i) {
      this.appendValueInput("IF" + i)
        .setCheck([
          "Boolean",
          "calcium_variable",
          "calcium_attribute",
          "calcium_subscript",
          "calcium_call",
          "calcium_arithmetic",
        ])
        .appendField("そうでなくもし")
      this.appendDummyInput("ELIF" + i).appendField("ならば:")
      this.appendStatementInput("DO" + i).appendField("")
    }
    if (this.elseCount_) {
      this.appendDummyInput("ELSE_LABEL").appendField("そうでなければ:")
      this.appendStatementInput("ELSE").appendField("")
    }
  },
}

Blockly.Extensions.registerMutator(
  PSEUDO_IF_MUTATOR_NAME,
  pseudoIfMutatorMixin,
  undefined,
  [PSEUDO_IF_ELIF_NAME, PSEUDO_IF_ELSE_NAME]
)

const pseudoIfChildBlocks: BlockDefinition[] = [
  {
    type: PSEUDO_IF_CONTAINER_NAME,
    message0: "もし",
    nextStatement: null,
    enableContextMenu: false,
    colour: 330,
    tooltip: tooltipManager.getValue("PSEUDO_IF_CONTAINER_TOOLTIP"),
  },
  {
    type: PSEUDO_IF_ELIF_NAME,
    message0: "そうでなくもし",
    previousStatement: null,
    nextStatement: null,
    enableContextMenu: false,
    colour: 330,
    tooltip: tooltipManager.getValue("PSEUDO_IF_ELIF_TOOLTIP"),
  },
  {
    type: PSEUDO_IF_ELSE_NAME,
    message0: "そうでなければ",
    previousStatement: null,
    enableContextMenu: false,
    colour: 330,
    tooltip: tooltipManager.getValue("PSEUDO_IF_ELSE_TOOLTIP"),
  },
]

Blockly.defineBlocksWithJsonArray(pseudoIfChildBlocks)

const pseudoIfBlock: { [key: string]: BlockDefinition } = {
  [PSEUDO_IF_NAME]: {
    init() {
      this.jsonInit({
        type: PSEUDO_IF_NAME,
        message0: "もし %1 ならば:",
        args0: [
          {
            type: "input_value",
            name: "IF0",
            check: [
              "Boolean",
              "calcium_variable",
              "calcium_attribute",
              "calcium_subscript",
              "calcium_call",
              "calcium_arithmetic",
            ],
          },
        ],
        message1: "%1",
        args1: [
          {
            type: "input_statement",
            name: "DO0",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 330,
        tooltip: tooltipManager.getValue("PSEUDO_IF_TOOLTIP"),
        mutator: PSEUDO_IF_MUTATOR_NAME,
        helpUrl: "",
      })
      this.elifCount_ = 0
      this.elseCount_ = 0
    },
  },
}

Blockly.common.defineBlocks(pseudoIfBlock)
