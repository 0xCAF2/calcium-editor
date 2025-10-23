import { calciumGenerator, trimParens } from '.'

const self = calciumGenerator

calciumGenerator.forBlock['calcium_compound_assignment'] = (block) => {
  let ref = self.valueToCode(block, 'REF', 0) || '["var", "i"]'
  ref = JSON.parse(trimParens(ref))
  const op = block.getFieldValue('OP')
  let value = self.valueToCode(block, 'VALUE', 0) || '1'
  value = JSON.parse(trimParens(value))
  return JSON.stringify([self.indent, [], op, ref, value]) + ','
}
