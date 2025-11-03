import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_int"] = (block) => {
  let value = self.valueToCode(block, "INT", 0) || '["var", "x"]'
  value = JSON.parse(trimParens(value))

  const code = ["call", ["var", "int"], [value]]
  return [JSON.stringify(code), 0]
}
