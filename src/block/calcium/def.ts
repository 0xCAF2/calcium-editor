import * as Blockly from "blockly"
// @ts-ignore
import { BlockDefinition } from "blockly/core/blocks"
import { messageManager, tooltipManager } from "../../constant-manager"

const CALCIUM_DEF_NAME = "calcium_def"
const CALCIUM_DEF_MUTATOR_NAME = "calcium_def_mutator"
const CALCIUM_DEF_PARAM_NAME = "calcium_def_param"
const CALCIUM_DEF_PARAMS_CONTAINER_NAME = "calcium_def_params_container"

const CALCIUM_DEF_METHOD_NAME = "calcium_def_method"
const CALCIUM_DEF_METHOD_MUTATOR_NAME = "calcium_def_method_mutator"

const calciumDefBlock: {
  [key: string]: BlockDefinition
} = {
  [CALCIUM_DEF_NAME]: {
    init() {
      this.jsonInit({
        type: CALCIUM_DEF_NAME,
        message0: "def %1 ( %2 ): %3 %4",
        args0: [
          {
            type: "field_input",
            name: "NAME",
            text: "f",
          },
          {
            type: "field_label_serializable",
            name: "LABELS",
            text: "",
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "STMTS",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 240,
        tooltip: tooltipManager.getValue("CALCIUM_DEF_TOOLTIP"),
        helpUrl: "",
        mutator: CALCIUM_DEF_MUTATOR_NAME,
      })
      this.countOfParameters = 0
      this.updateShape()
    },
  },
}

Blockly.common.defineBlocks(calciumDefBlock)

const calciumDefMutatorMixin: any = {
  compose(containerBlock: Blockly.Block) {
    let itemBlock: any = containerBlock.getInputTargetBlock("PARAMS")
    const connections: any[] = []
    this.parameters = []
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_)
      this.parameters.push(itemBlock.getFieldValue("PARAM"))
      itemBlock =
        itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
    }
    this.countOfParameters = connections.length
    this.updateShape()
  },
  decompose(workspace: Blockly.Workspace) {
    const containerBlock = workspace.newBlock(
      CALCIUM_DEF_PARAMS_CONTAINER_NAME
    ) as Blockly.BlockSvg
    containerBlock.initSvg()
    let connection: any = containerBlock.getInput("PARAMS")?.connection
    for (let i = 0; i < this.countOfParameters; ++i) {
      const itemBlock = workspace.newBlock(
        CALCIUM_DEF_PARAM_NAME
      ) as Blockly.BlockSvg
      itemBlock.initSvg()
      itemBlock.setFieldValue(this.parameters[i], "PARAM")
      connection.connect(itemBlock.previousConnection)
      connection = itemBlock.nextConnection
    }
    return containerBlock
  },
  saveExtraState() {
    return {
      countOfParameters: this.countOfParameters,
      parameters: this.parameters,
    }
  },
  loadExtraState(state: any) {
    this.countOfParameters = state.countOfParameters
    this.parameters = state.parameters
    this.updateShape()
  },
  updateShape() {
    if (this.parameters) {
      let labelStr = ""
      if (this.countOfParameters > 0) {
        labelStr = this.parameters.join(", ")
      }
      Blockly.Events.disable()
      try {
        this.setFieldValue(labelStr, "LABELS")
      } finally {
        Blockly.Events.enable()
      }
    }
  },
}

Blockly.Extensions.registerMutator(
  CALCIUM_DEF_MUTATOR_NAME,
  calciumDefMutatorMixin,
  undefined,
  [CALCIUM_DEF_PARAM_NAME]
)

const calciumDefParamBlocks: BlockDefinition[] = [
  {
    type: CALCIUM_DEF_PARAM_NAME,
    message0: messageManager.getValue("CALCIUM_DEF_PARAM_MESSAGE"),
    args0: [
      {
        type: "field_input",
        name: "PARAM",
        text: "a",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 240,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: CALCIUM_DEF_PARAMS_CONTAINER_NAME,
    message0: "%1",
    args0: [
      {
        type: "input_statement",
        name: "PARAMS",
      },
    ],
    colour: 240,
    tooltip: "",
    helpUrl: "",
  },
]

Blockly.defineBlocksWithJsonArray(calciumDefParamBlocks)

const calciumDefMethodMutatorMixin: any = {
  compose: calciumDefMutatorMixin.compose,
  decompose: calciumDefMutatorMixin.decompose,
  saveExtraState: calciumDefMutatorMixin.saveExtraState,
  loadExtraState: calciumDefMutatorMixin.loadExtraState,
  updateShape() {
    let labelStr = ""
    if (this.countOfParameters > 0) {
      if (this.parameters) {
        labelStr = `(self, ${this.parameters.join(", ")}):`
      }
    } else {
      labelStr = "(self):"
    }
    Blockly.Events.disable()
    try {
      this.setFieldValue(labelStr, "LABELS")
    } finally {
      Blockly.Events.enable()
    }
  },
}

Blockly.Extensions.registerMutator(
  CALCIUM_DEF_METHOD_MUTATOR_NAME,
  calciumDefMethodMutatorMixin,
  undefined,
  [CALCIUM_DEF_PARAM_NAME]
)

const calciumDefMethodBlock: {
  [key: string]: BlockDefinition
} = {
  [CALCIUM_DEF_METHOD_NAME]: {
    init() {
      this.jsonInit({
        type: CALCIUM_DEF_METHOD_NAME,
        message0: "def %1 %2 %3 %4",
        args0: [
          {
            type: "field_input",
            name: "NAME",
            text: "__init__",
          },
          {
            type: "field_label_serializable",
            name: "LABELS",
            text: "",
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_statement",
            name: "STMTS",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 240,
        tooltip: tooltipManager.getValue("CALCIUM_DEF_METHOD_TOOLTIP"),
        helpUrl: "",
        mutator: CALCIUM_DEF_METHOD_MUTATOR_NAME,
      })
      this.countOfParameters = 0
      this.updateShape()
    },
  },
}

Blockly.common.defineBlocks(calciumDefMethodBlock)
