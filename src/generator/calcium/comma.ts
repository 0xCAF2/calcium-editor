import { calciumGenerator } from "."

const self = calciumGenerator

calciumGenerator.forBlock['calcium_comma'] = (block) => {
  let first = self.valueToCode(block, 'FIRST', 0) || '["var", "a"]'
  first = JSON.parse(first)
  let second = self.valueToCode(block, 'SECOND', 0) || '["var", "b"]'
  second = JSON.parse(second)
  return [JSON.stringify([',', first, second]), 0]
}