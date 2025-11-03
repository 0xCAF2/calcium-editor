import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_len"] = (block) => {
  let array = self.valueToCode(block, "ARRAY", 0) || '["list", []]'
  array = JSON.parse(trimParens(array))

  const code = ["call", ["var", "len"], [array]]
  return [JSON.stringify(code), 0]
}
