import * as Blockly from "blockly"
import "./message"
import "./tooltip"
import * as Lang from "blockly/msg/ja"
import type { LocalizedString } from ".."
import "../../block/pseudo"
import { CategoryDefinition } from "../../editor"
import "../../generator/calcium"
import "../../generator/pseudo"

// @ts-ignore
Blockly.setLocale(Lang)

export class JaJpLocalization implements LocalizedString {
  helpUrl = "https://help.caed.app/ja/"

  savedFile = "保存ファイル"
  noFiles = "保存されたファイルはありません。"

  run = "実行する"
  stop = "実行を終了する"

  input = "入力する"
}

export function buildLocalization() {
  return new JaJpLocalization()
}

export const categories: CategoryDefinition[] = [
  {
    基本: [
      "pseudo_variable",
      "pseudo_number",
      "pseudo_str",
      "pseudo_assignment",
      "pseudo_print",
    ],
  },
  {
    演算: [
      "pseudo_arithmetic",
      "pseudo_relational" /* dummy comment for next newline */,
    ],
  },
  {
    配列: [
      "pseudo_array",
      "pseudo_array_slice",
      "pseudo_assign_array",
      "pseudo_assign_zero",
    ],
  },
  {
    条件分岐: [
      "pseudo_logical",
      "pseudo_not",
      "pseudo_if" /* dummy comment for newline */,
    ],
  },
  {
    繰り返し: [
      "pseudo_for_increment",
      "pseudo_for_decrement",
      "pseudo_while" /* dummy comment for newline */,
    ],
  },
  {
    関数: [
      "pseudo_len",
      "pseudo_int",
      "pseudo_random" /* dummy comment for next newline */,
    ],
  },
  {
    入力: [
      "pseudo_input_int",
      "pseudo_input_str" /* dummy comment for pretty newlines */,
    ],
  },
]
