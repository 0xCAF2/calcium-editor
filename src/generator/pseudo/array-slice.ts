import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_array_slice"] = (block) => {
  let ref = self.valueToCode(block, "REF", 0) || '["var", "Data"]'
  ref = JSON.parse(trimParens(ref))

  let start = self.valueToCode(block, "START", 0) || '["num", "0"]'
  start = JSON.parse(trimParens(start))

  let endStr = self.valueToCode(block, "END", 0) || '["num", "2"]'
  let end = JSON.parse(trimParens(endStr))
  if (end !== null) {
    end = ["+", end, ["num", "1"]]
  }

  const code = JSON.stringify(["sub", ref, start, end])
  return [code, 0]
}
