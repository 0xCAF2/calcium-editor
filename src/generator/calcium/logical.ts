import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_logical"] = (block) => {
  const op = block.getFieldValue("OP")
  let left = self.valueToCode(block, "LEFT", 0) || '["num", "0"]'
  left = JSON.parse(trimParens(left))
  let right = self.valueToCode(block, "RIGHT", 0) || '["num", "0"]'
  right = JSON.parse(trimParens(right))
  const code = JSON.stringify([op, left, right])
  return [code, 0]
}
