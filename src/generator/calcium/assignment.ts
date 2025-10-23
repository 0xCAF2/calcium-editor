import { calciumGenerator, trimParens } from "."

const self = calciumGenerator
calciumGenerator.forBlock["calcium_assignment"] = (block) => {
  let ref = self.valueToCode(block, "REF", 0) || `["var", "i"]`
  ref = trimParens(ref)
  ref = JSON.parse(ref)

  let arg0 = self.valueToCode(block, "VALUE", 0) || '["num", "0"]'
  arg0 = trimParens(arg0)
  arg0 = JSON.parse(arg0)
  return JSON.stringify([self.indent, [], "=", ref, arg0]) + ","
}
