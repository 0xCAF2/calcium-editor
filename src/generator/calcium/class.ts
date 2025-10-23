import { calciumGenerator } from '.'

const self = calciumGenerator

calciumGenerator.forBlock['calcium_class'] = (block) => {
  const className = block.getFieldValue('NAME')
  const superclassCode = self.valueToCode(block, 'SUPERCLASS', 0) || 'null'
  const superclass = JSON.parse(superclassCode) // ref or null

  self.shiftIndent(1)
  const stmts =
    self.statementToCode(block, 'STMTS') ||
    JSON.stringify([self.indent, [], 'pass']) + ','
  self.shiftIndent(-1)
  return (
    JSON.stringify([self.indent, [], 'class', className, superclass]) +
    ',' +
    stmts
  )
}
