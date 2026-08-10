import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_slice"] = (block) => {
  let start = self.valueToCode(block, "START", 0) || '["num", "0"]'
  start = JSON.parse(trimParens(start))
  let stop = self.valueToCode(block, "STOP", 0) || '["num", "0"]'
  stop = JSON.parse(trimParens(stop))
  const code = JSON.stringify(["slice", start, stop])
  return [code, 0]
}
