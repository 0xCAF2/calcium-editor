import { calciumGenerator, trimParens } from '.'

const self = calciumGenerator

calciumGenerator.forBlock['calcium_attribute'] = (block) => {
  let ref = self.valueToCode(block, 'REF', 0) || `["var", "self"]`
  ref = JSON.parse(trimParens(ref))
  let attr = ['attr']
  attr.push(ref) // remove keyword
  attr.push(block.getFieldValue('ATTR') || 'name')
  return [JSON.stringify(attr), 0]
}
