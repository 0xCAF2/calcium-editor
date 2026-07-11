import * as Blockly from "blockly"
import "./message"
import "./tooltip"
import * as Lang from "blockly/msg/ja"
import type { LocalizedString } from ".."
import "../../block/pseudo"
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

export const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "基本",
      contents: [
        {
          kind: "block",
          type: "pseudo_variable",
        },
        {
          kind: "block",
          type: "pseudo_number",
        },
        {
          kind: "block",
          type: "pseudo_str",
        },
        {
          kind: "block",
          type: "pseudo_assignment",
        },
        {
          kind: "block",
          type: "pseudo_print",
        },
      ],
    },
    {
      kind: "category",
      name: "演算",
      contents: [
        {
          kind: "block",
          type: "pseudo_arithmetic",
        },
        {
          kind: "block",
          type: "pseudo_relational",
        },
      ],
    },
    {
      kind: "category",
      name: "配列",
      contents: [
        {
          kind: "block",
          type: "pseudo_array",
        },
        {
          kind: "block",
          type: "pseudo_array_slice",
        },
        {
          kind: "block",
          type: "pseudo_assign_array",
        },
        {
          kind: "block",
          type: "pseudo_assign_zero",
        },
      ],
    },
    {
      kind: "category",
      name: "条件分岐",
      contents: [
        {
          kind: "block",
          type: "pseudo_logical",
        },
        {
          kind: "block",
          type: "pseudo_not",
        },
        {
          kind: "block",
          type: "pseudo_if",
        },
      ],
    },
    {
      kind: "category",
      name: "繰り返し",
      contents: [
        {
          kind: "block",
          type: "pseudo_for_increment",
        },
        {
          kind: "block",
          type: "pseudo_for_decrement",
        },
        {
          kind: "block",
          type: "pseudo_while",
        },
      ],
    },
    {
      kind: "category",
      name: "関数",
      contents: [
        {
          kind: "block",
          type: "pseudo_len",
        },
        {
          kind: "block",
          type: "pseudo_int",
        },
        {
          kind: "block",
          type: "pseudo_random",
        },
      ],
    },
    {
      kind: "category",
      name: "入力",
      contents: [
        {
          kind: "block",
          type: "pseudo_input_int",
        },
        {
          kind: "block",
          type: "pseudo_input_str",
        },
      ],
    },
  ],
}
