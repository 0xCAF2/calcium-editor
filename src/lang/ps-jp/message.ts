import { ConstantValues, messageManager } from '../../constant-manager'

const PSEUDO_CALL_ARG_MESSAGE = '引数を追加'
const PSEUDO_LIST_ITEM_MESSAGE = 'リストの要素'
const PSEUDO_PRINT_ARG_MESSAGE = '引数を追加'

const messages: ConstantValues = {
  PSEUDO_CALL_ARG_MESSAGE,
  PSEUDO_LIST_ITEM_MESSAGE,
  PSEUDO_PRINT_ARG_MESSAGE,
}

messageManager.addValues(messages)
