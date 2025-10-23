import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_array"] = (block) => {
  let ref = self.valueToCode(block, "REF", 0) || '["var", "Data"]'
  ref = JSON.parse(trimParens(ref))

  let sub = self.valueToCode(block, "SUB", 0) || '["num", "0"]'
  sub = JSON.parse(trimParens(sub))

  const code = JSON.stringify(["sub", ref, sub])
  return [code, 0]
}
