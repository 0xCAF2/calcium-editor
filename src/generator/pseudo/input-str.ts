import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_input_str"] = (block) => {
  let ref = self.valueToCode(block, "REF", 0) || '["var", "Data"]'
  ref = JSON.parse(trimParens(ref))

  const code = [self.indent, [], "=", ref, ["call", ["var", "input"], [""]]]
  return JSON.stringify(code) + ","
}
