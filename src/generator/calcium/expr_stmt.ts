import { calciumGenerator } from '.'

const self = calciumGenerator

calciumGenerator.forBlock['calcium_expr_stmt'] = (block) => {
  const callStr =
    self.valueToCode(block, 'CALL', 0) || '["call", ["var", "print"], [""]]'
  const call = JSON.parse(callStr)
  return JSON.stringify([self.indent, [], 'expr', call]) + ','
}
