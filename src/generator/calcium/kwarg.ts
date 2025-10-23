import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock['calcium_kwarg'] = (block) => {
  const kw = block.getField('NAME')?.getText() ?? 'end'
  let value = self.valueToCode(block, 'VALUE', 0) || '""'
  value = JSON.parse(trimParens(value))
  return [JSON.stringify(['kwarg', kw, value]), 0]
}
