import { ConstantValues, messageManager } from '../../constant-manager'

const CALCIUM_CALL_ARG_MESSAGE = '引数を追加'
const CALCIUM_DEF_PARAM_MESSAGE = '引数 %1'
const CALCIUM_LIST_ITEM_MESSAGE = 'リストの要素'
const CALCIUM_PRINT_ARG_MESSAGE = '引数を追加'

const messages: ConstantValues = {
  CALCIUM_CALL_ARG_MESSAGE,
  CALCIUM_DEF_PARAM_MESSAGE,
  CALCIUM_LIST_ITEM_MESSAGE,
  CALCIUM_PRINT_ARG_MESSAGE,
}

messageManager.addValues(messages)
