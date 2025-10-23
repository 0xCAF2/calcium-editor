import { calciumGenerator, trimParens } from '.'

const self = calciumGenerator

calciumGenerator.forBlock['calcium_for'] = (block) => {
  const vars = self.valueToCode(block, 'VARS', 0) || '["var", "i"]'
  const iterable = self.valueToCode(block, 'ITER', 0) || '[0, 1, 2]'

  self.shiftIndent(1)
  const stmts =
    self.statementToCode(block, 'STMTS') ||
    JSON.stringify([self.indent, [], 'pass']) + ','
  self.shiftIndent(-1)

  return (
    JSON.stringify([
      self.indent,
      [],
      'for',
      JSON.parse(vars),
      JSON.parse(trimParens(iterable)),
    ]) +
    ',' +
    stmts
  )
}
