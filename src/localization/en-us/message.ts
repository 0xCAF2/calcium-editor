import { ConstantValues, messageManager } from "../../constant-manager"

const CALCIUM_CALL_ARG_MESSAGE = "Add argument"
const CALCIUM_DEF_PARAM_MESSAGE = "Parameter %1"
const CALCIUM_LIST_ITEM_MESSAGE = "List item"
const CALCIUM_PRINT_ARG_MESSAGE = "Add argument"

const messages: ConstantValues = {
  CALCIUM_CALL_ARG_MESSAGE,
  CALCIUM_DEF_PARAM_MESSAGE,
  CALCIUM_LIST_ITEM_MESSAGE,
  CALCIUM_PRINT_ARG_MESSAGE,
}

messageManager.addValues(messages)
