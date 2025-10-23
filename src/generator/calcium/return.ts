import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock['calcium_return'] = (block) => {
  let value = self.valueToCode(block, 'VALUE', 0) || 'null'
  value = JSON.parse(trimParens(value))
  return JSON.stringify([self.indent, [], 'return', value]) + ','
}
