import Blockly from 'blockly'
import { parseFullWidthNumber } from './utils'

const generator = new Blockly.Generator('Calcium')

generator['calcium_add_ja'] = function (block) {
  let ref = generator.valueToCode(block, 'REF', 0) || '["var", "x"]'
  ref = JSON.parse(generator.removeParens(ref))
  let value = generator.valueToCode(block, 'VALUE', 0) || '0'
  value = JSON.parse(generator.removeParens(value))
  return JSON.stringify([generator.getIndent(), [], '+=', ref, value]) + ','
}

generator['calcium_arithmetic'] = generator['calcium_arithmetic_ja'] =
  function (block) {
    const op = block.getFieldValue('OP')
    let left = generator.valueToCode(block, 'LEFT', 0) || '0'
    left = JSON.parse(generator.removeParens(left))
    let right = generator.valueToCode(block, 'RIGHT', 0) || '1'
    right = JSON.parse(generator.removeParens(right))
    const code = JSON.stringify([op, left, right])
    return [code, 0]
  }

generator['calcium_assign'] = generator['calcium_assign_ja'] = function (
  block
) {
  let ref = generator.valueToCode(block, 'REF', 0) || `["var", "x"]`
  ref = generator.removeParens(ref)
  ref = JSON.parse(ref)

  let arg0 = generator.valueToCode(block, 'VALUE', 0) || '0'
  arg0 = generator.removeParens(arg0)
  arg0 = JSON.parse(arg0)
  return JSON.stringify([generator.getIndent(), [], '=', ref, arg0]) + ','
}

generator['calcium_attribute'] = generator['calcium_attribute_ja'] = function (
  block
) {
  let ref = generator.valueToCode(block, 'REF', 0) || `["var", "self"]`
  ref = JSON.parse(generator.removeParens(ref))
  let attr = ['attr']
  attr.push(ref) // remove keyword
  attr.push(block.getFieldValue('ATTR') || 'name')
  return [JSON.stringify(attr), 0]
}

generator['calcium_bitwise'] = function (block) {
  const op = block.getFieldValue('OP')
  let left = generator.valueToCode(block, 'LEFT', 0) || '0'
  left = JSON.parse(generator.removeParens(left))
  let right = generator.valueToCode(block, 'RIGHT', 0) || '0'
  right = JSON.parse(generator.removeParens(right))
  const code = JSON.stringify([op, left, right])
  return [code, 0]
}

generator['calcium_bitwise_not'] = function (block) {
  let value = generator.valueToCode(block, 'VALUE', 0) || '0'
  value = JSON.parse(generator.removeParens(value))
  return [JSON.stringify(['~', value]), 0]
}

generator['calcium_boolean'] = generator['calcium_boolean_ja'] = function (
  block
) {
  return [block.getFieldValue('VALUE'), 0]
}

generator['calcium_break_continue'] = generator['calcium_break_continue_ja'] =
  function (block) {
    return (
      JSON.stringify([generator.getIndent(), [], block.getFieldValue('FLOW')]) +
      ','
    )
  }

generator['calcium_call'] = generator['calcium_call_ja'] = function (block) {
  const args = []
  for (let i = 0; i < block.countOfArguments; ++i) {
    let arg = generator.valueToCode(block, 'ARG' + i, 0) || 'null'
    arg = generator.removeParens(arg)
    args.push(JSON.parse(arg))
  }
  let callRef = generator.valueToCode(block, 'REF', 0) || `["var", "f"]`
  callRef = JSON.parse(callRef)

  return [JSON.stringify(['call', callRef, args]), 0]
}

generator['calcium_callnoreturn_ja'] = function (block) {
  const args = []
  for (let i = 0; i < block.countOfArguments; ++i) {
    let arg = generator.valueToCode(block, 'ARG' + i, 0) || 'null'
    arg = generator.removeParens(arg)
    args.push(JSON.parse(arg))
  }
  let callRef = generator.valueToCode(block, 'REF', 0) || `["var", "f"]`
  callRef = JSON.parse(callRef)

  return (
    JSON.stringify([
      generator.getIndent(),
      [],
      'expr',
      ['call', callRef, args],
    ]) + ','
  )
}

generator['calcium_callreturn_ja'] = function (block) {
  let returnRef = null
  returnRef = generator.valueToCode(block, 'RETURN', 0) || 'null'
  returnRef = JSON.parse(returnRef)
  const args = []
  for (let i = 0; i < block.countOfArguments; ++i) {
    let arg = generator.valueToCode(block, 'ARG' + i, 0) || 'null'
    arg = generator.removeParens(arg)
    args.push(JSON.parse(arg))
  }
  let callRef = generator.valueToCode(block, 'REF', 0) || `["var", "f"]`
  callRef = JSON.parse(callRef)

  return (
    JSON.stringify([
      generator.getIndent(),
      [],
      '=',
      returnRef,
      ['call', callRef, args],
    ]) + ','
  )
}

generator['calcium_class_ja'] = function (block) {
  return [JSON.stringify(['var', block.getField('NAME').getText()]), 0]
}

generator['calcium_class_def'] = generator['calcium_class_def_ja'] = function (
  block
) {
  const className = block.getFieldValue('NAME')
  let superclass = generator.valueToCode(block, 'SUPERCLASS', 0) || 'null'
  superclass = JSON.parse(superclass) // ref or null

  generator.shiftIndent(1)
  const stmts =
    generator.statementToCode(block, 'STMTS') ||
    JSON.stringify([generator.getIndent(), [], 'pass']) + ','
  generator.shiftIndent(-1)
  return (
    JSON.stringify([
      generator.getIndent(),
      [],
      'class',
      className,
      superclass,
    ]) +
    ',' +
    stmts
  )
}

generator['calcium_comma'] = function (block) {
  let first = generator.valueToCode(block, 'FIRST', 0) || '["var", "a"]'
  first = JSON.parse(first)
  let second = generator.valueToCode(block, 'SECOND', 0) || '["var", "b"]'
  second = JSON.parse(second)
  return [JSON.stringify([',', first, second]), 0]
}

generator['calcium_compound_assign'] = function (block) {
  let ref = generator.valueToCode(block, 'REF', 0) || '["var", "x"]'
  ref = JSON.parse(generator.removeParens(ref))
  const op = block.getFieldValue('OP')
  let value = generator.valueToCode(block, 'VALUE', 0) || '0'
  value = JSON.parse(generator.removeParens(value))
  return JSON.stringify([generator.getIndent(), [], op, ref, value]) + ','
}

generator['calcium_def'] = generator['calcium_def_ja'] = function (block) {
  const funcName = block.getField('NAME').getText()
  generator.shiftIndent(1)
  const stmts =
    generator.statementToCode(block, 'STMTS') ||
    JSON.stringify([generator.getIndent(), [], 'pass']) + ','
  generator.shiftIndent(-1)

  return (
    JSON.stringify([
      generator.getIndent(),
      [],
      'def',
      funcName,
      block.parameters,
    ]) +
    ',' +
    stmts
  )
}

generator['calcium_defmethod'] = generator['calcium_defmethod_ja'] = function (
  block
) {
  const name = block.getField('NAME').getText()
  generator.shiftIndent(1)
  const stmts =
    generator.statementToCode(block, 'STMTS') ||
    JSON.stringify([generator.getIndent(), [], 'pass']) + ','
  generator.shiftIndent(-1)

  const parameters = block.parameters || []
  return (
    JSON.stringify([
      generator.getIndent(),
      [],
      'def',
      name,
      ['self', ...parameters],
    ]) +
    ',' +
    stmts
  )
}

generator['calcium_dict'] = generator['calcium_dict_ja'] = function () {
  return ['{}', 0]
}

generator['calcium_expr_stmt'] = function (block) {
  let call =
    generator.valueToCode(block, 'CALL', 0) ||
    '["call", ["var", "print"], [""]]'
  call = JSON.parse(call)
  return JSON.stringify([generator.getIndent(), [], 'expr', call]) + ','
}

generator['calcium_for'] = generator['calcium_for_ja'] = function (block) {
  let vars = generator.valueToCode(block, 'VARS', 0) || '["var", "i"]'
  vars = JSON.parse(vars)
  let iterable = generator.valueToCode(block, 'ITER', 0) || '"Hello"'
  iterable = JSON.parse(generator.removeParens(iterable))

  generator.shiftIndent(1)
  const stmts =
    generator.statementToCode(block, 'STMTS') ||
    JSON.stringify([generator.getIndent(), [], 'pass']) + ','
  generator.shiftIndent(-1)

  return (
    JSON.stringify([generator.getIndent(), [], 'for', vars, iterable]) +
    ',' +
    stmts
  )
}

generator['calcium_for_range_ja'] = function (block) {
  let variable = generator.valueToCode(block, 'VARS', 0) || '["var", "i"]'
  variable = JSON.parse(variable)

  let start = generator.valueToCode(block, 'START', 0)
  if (!start) {
    start = null
  } else {
    start = JSON.parse(generator.removeParens(start))
  }

  let stop = generator.valueToCode(block, 'STOP', 0) || '10'
  stop = JSON.parse(generator.removeParens(stop))

  let step = generator.valueToCode(block, 'STEP', 0)
  if (!step) {
    step = null
  } else {
    step = JSON.parse(generator.removeParens(step))
  }

  generator.shiftIndent(1)
  const stmts =
    generator.statementToCode(block, 'STMTS') ||
    JSON.stringify([generator.getIndent(), [], 'pass']) + ','
  generator.shiftIndent(-1)
  let range
  if (start === null && step === null) {
    range = [stop]
  } else if (start !== null && step === null) {
    range = [start, stop]
  } else if (start !== null && step !== null) {
    range = [start, stop, step]
  } else {
    range = [0, stop, step]
  }
  return (
    JSON.stringify([
      generator.getIndent(),
      [],
      'for',
      variable,
      ['call', ['var', 'range'], range],
    ]) +
    ',' +
    stmts
  )
}

generator['calcium_function_ja'] = generator['calcium_class_ja']

generator['calcium_if'] = generator['calcium_if_ja'] = function (block) {
  let n = 0
  let codeArray = [[generator.getIndent(), [], 'ifs']]
  generator.shiftIndent(1)
  let branchCode, conditionCode
  do {
    conditionCode = generator.valueToCode(block, 'IF' + n, 0) || 'false'
    conditionCode = generator.removeParens(conditionCode)
    codeArray.push([
      generator.getIndent(),
      [],
      n === 0 ? 'if' : 'elif',
      JSON.parse(conditionCode),
    ])
    generator.shiftIndent(1)
    branchCode =
      generator.statementToCode(block, 'DO' + n) ||
      JSON.stringify([generator.getIndent(), [], 'pass']) + ','
    generator.shiftIndent(-1)
    // branchCode needs "[" and "]" in order to be a valid JSON array.
    codeArray = codeArray.concat(
      JSON.parse('[' + generator.removeComma(branchCode) + ']')
    )
    ++n
  } while (block.getInput('IF' + n))

  if (block.getInput('ELSE')) {
    codeArray.push([generator.getIndent(), [], 'else'])
    generator.shiftIndent(1)
    branchCode =
      generator.statementToCode(block, 'ELSE') ||
      JSON.stringify([generator.getIndent(), [], 'pass']) + ','
    codeArray = codeArray.concat(
      JSON.parse('[' + generator.removeComma(branchCode) + ']')
    )
    generator.shiftIndent(-1)
  }
  generator.shiftIndent(-1)
  const codeStr = JSON.stringify(codeArray)
  // remove outer "[" and "]".
  return codeStr.substring(1, codeStr.length - 1) + ','
}

generator['calcium_import'] = generator['calcium_import_ja'] = function (
  block
) {
  const moduleName = block.getField('NAME').getText()
  return JSON.stringify([generator.getIndent(), [], 'import', moduleName]) + ','
}

generator['calcium_kwarg'] = function (block) {
  const kw = block.getField('NAME').getText()
  let value = generator.valueToCode(block, 'VALUE', 0) || '0'
  value = JSON.parse(generator.removeParens(value))
  return [JSON.stringify(['kwarg', kw, value]), 0]
}

generator['calcium_list'] = generator['calcium_list_ja'] = function (block) {
  const elements = new Array(block.itemCount_)
  for (let i = 0; i < block.itemCount_; ++i) {
    let elem = generator.valueToCode(block, 'ADD' + i, 0) || 'null'
    elem = generator.removeParens(elem)
    elements[i] = elem
  }
  const code = '[[' + elements.join(', ') + ']]'
  return [code, 0]
}

generator['calcium_logical'] = generator['calcium_logical_ja'] =
  generator['calcium_bitwise']

generator['calcium_method_ja'] = generator['calcium_attribute']

generator['calcium_none'] = function () {
  return ['null', 0]
}

generator['calcium_not'] = generator['calcium_not_ja'] = function (block) {
  let value = generator.valueToCode(block, 'VALUE', 0) || 'true'
  value = JSON.parse(generator.removeParens(value))
  return [JSON.stringify(['not', value]), 0]
}

generator['calcium_number'] = function (block) {
  const numStr = block.getFieldValue('NUM') || '0'
  return [parseFullWidthNumber(numStr), 0]
}

generator['calcium_print_ja'] = function (block) {
  let value = generator.valueToCode(block, 'VALUE', 0) || '""'
  value = generator.removeParens(value)
  value = JSON.parse(value)
  const args = []
  for (let i = 0; i < block.countOfArguments; ++i) {
    let arg = generator.valueToCode(block, 'ARG' + i, 0) || 'null'
    arg = generator.removeParens(arg)
    args.push(JSON.parse(arg))
  }
  args.splice(0, 0, value)
  return (
    JSON.stringify([
      generator.getIndent(),
      [],
      'expr',
      ['call', ['var', 'print'], args],
    ]) + ','
  )
}

generator['calcium_pass'] = function () {
  return JSON.stringify([generator.getIndent(), [], 'pass']) + ','
}

generator['calcium_relational'] = generator['calcium_relational_ja'] =
  generator['calcium_logical']

generator['calcium_return'] = generator['calcium_return_ja'] = function (
  block
) {
  let value = generator.valueToCode(block, 'VALUE', 0) || 'null'
  value = JSON.parse(generator.removeParens(value))
  return JSON.stringify([generator.getIndent(), [], 'return', value]) + ','
}

generator['calcium_slice'] = generator['calcium_slice_ja'] = function (block) {
  let start = generator.valueToCode(block, 'START', 0) || 'null'
  start = JSON.parse(generator.removeParens(start))
  let end = generator.valueToCode(block, 'END', 0) || 'null'
  end = JSON.parse(generator.removeParens(end))
  const code = JSON.stringify(['slice', start, end])
  return [code, 0]
}

generator['calcium_str'] = generator['calcium_str_ja'] = function (block) {
  let str = block.getField('STR').getText() || ''
  return [generator.quote_(str), 0]
}

generator['calcium_subscript'] = generator['calcium_subscript_ja'] = function (
  block
) {
  let ref = generator.valueToCode(block, 'REF', 0) || `["var", "s"]`
  ref = JSON.parse(generator.removeParens(ref))

  let sub = generator.valueToCode(block, 'SUB', 0) || '0'
  sub = JSON.parse(generator.removeParens(sub))
  if (sub instanceof Array && sub[0] === 'slice') {
    const start = sub[1]
    const end = sub[2]
    const code = JSON.stringify(['sub', ref, start, end])
    return [code, 0]
  } else {
    const code = JSON.stringify(['sub', ref, sub])
    return [code, 0]
  }
}

generator['calcium_variable'] = generator['calcium_variable_ja'] =
  generator['calcium_class_ja']

generator['calcium_while'] = generator['calcium_while_ja'] = function (block) {
  let condition = generator.valueToCode(block, 'COND', 0) || 'false'
  condition = JSON.parse(generator.removeParens(condition))

  generator.shiftIndent(1)
  var stmts =
    generator.statementToCode(block, 'STMTS') ||
    JSON.stringify([generator.getIndent(), [], 'pass']) + ','
  generator.shiftIndent(-1)

  return (
    JSON.stringify([generator.getIndent(), [], 'while', condition]) +
    ',' +
    stmts
  )
}

generator.init = function () {
  generator.indent = 1
}

generator.finish = function (code) {
  const start = JSON.stringify([1, [], '#', '0_3'])
  const end = JSON.stringify([1, [], 'end'])
  return `[${start},${code}${end}]`
}

/** gets the indent of a line. */
generator.getIndent = function () {
  return generator.indent
}

generator.quote_ = function (s) {
  let str = s.replace(/\\/g, '\\\\').replace(/\n/g, '\\\n')

  var quote = '"'
  if (str.indexOf('"') !== -1) {
    str = str.replace(/"/g, '\\"')
  }
  return quote + str + quote
}

generator.removeComma = function (codeStr) {
  return codeStr.substring(0, codeStr.length - 1)
}

/** removes surrounding parentheses. */
generator.removeParens = function (codeStr) {
  let strWithoutParens = codeStr
  if (codeStr && codeStr[0] === '(') {
    strWithoutParens = codeStr.substring(1, codeStr.length - 1)
  }
  return strWithoutParens
}

generator.scrub_ = function (block, code, opt_thisOnly) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock()
  var nextCode = opt_thisOnly ? '' : generator.blockToCode(nextBlock)
  return code + nextCode
}

generator.scrubNakedValue = function () {
  return ''
}

/** adds offset to indent for the next blocks. */
generator.shiftIndent = function (offset) {
  generator.indent += offset
}
export default generator
