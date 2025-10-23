import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_slice"] = (block) => {
  let start = self.valueToCode(block, "START", 0) || '["num", "0"]'
  start = JSON.parse(trimParens(start))
  let end = self.valueToCode(block, "END", 0) || '["num", "0"]'
  end = JSON.parse(trimParens(end))
  const code = JSON.stringify(["slice", start, end])
  return [code, 0]
}
