import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock['calcium_not'] = (block) => {
  let value = self.valueToCode(block, 'VALUE', 0) || 'true'
  value = JSON.parse(trimParens(value))
  return [JSON.stringify(['not', value]), 0]
}
