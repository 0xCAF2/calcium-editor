import { calciumGenerator, trimParens, trimLastComma } from '.'

const self = calciumGenerator

calciumGenerator.forBlock['calcium_if'] = (block) => {
  let n = 0
  let codeArray = [[self.indent, [], 'ifs']]
  self.shiftIndent(1)
  let branchCode, conditionCode
  do {
    conditionCode = self.valueToCode(block, 'IF' + n, 0) || 'false'
    conditionCode = trimParens(conditionCode)
    codeArray.push([
      self.indent,
      [],
      n === 0 ? 'if' : 'elif',
      JSON.parse(conditionCode),
    ])
    self.shiftIndent(1)
    branchCode =
      self.statementToCode(block, 'DO' + n) ||
      JSON.stringify([self.indent, [], 'pass']) + ','
    self.shiftIndent(-1)
    // branchCode needs "[" and "]" in order to be a valid JSON array.
    codeArray = codeArray.concat(
      JSON.parse('[' + trimLastComma(branchCode) + ']')
    )
    ++n
  } while (block.getInput('IF' + n))

  if (block.getInput('ELSE')) {
    codeArray.push([self.indent, [], 'else'])
    self.shiftIndent(1)
    branchCode =
      self.statementToCode(block, 'ELSE') ||
      JSON.stringify([self.indent, [], 'pass']) + ','
    codeArray = codeArray.concat(
      JSON.parse('[' + trimLastComma(branchCode) + ']')
    )
    self.shiftIndent(-1)
  }
  self.shiftIndent(-1)
  const codeStr = JSON.stringify(codeArray)
  // remove outer "[" and "]".
  return codeStr.substring(1, codeStr.length - 1) + ','
}
