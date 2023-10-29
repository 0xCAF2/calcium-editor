import Blockly from 'blockly'
import { parseFullWidthNumber } from './util'

export class CalciumGenerator extends Blockly.Generator {
  indent: number
  constructor(name: string) {
    super(name)
    this.indent = 1

    this.forBlock['calcium_add_repr'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "x"]'
      ref = JSON.parse(removeParens(ref))
      let value = this.valueToCode(block, 'VALUE', 0) || '1'
      value = JSON.parse(removeParens(value))
      return JSON.stringify([this.indent, [], '+=', ref, value]) + ','
    }

    this.forBlock['calcium_arithmetic'] =
      this.forBlock['calcium_arithmetic_repr'] =
      this.forBlock['pseudo_arithmetic'] =
        (block) => {
          const op = block.getFieldValue('OP')
          let left = this.valueToCode(block, 'LEFT', 0) || '["var", "i"]'
          left = JSON.parse(removeParens(left))
          let right = this.valueToCode(block, 'RIGHT', 0) || '1'
          right = JSON.parse(removeParens(right))
          const code = JSON.stringify([op, left, right])
          return [code, 0]
        }

    this.forBlock['calcium_assign'] =
      this.forBlock['calcium_assign_repr'] =
      this.forBlock['pseudo_assign'] =
        (block) => {
          let ref = this.valueToCode(block, 'REF', 0) || `["var", "x"]`
          ref = removeParens(ref)
          ref = JSON.parse(ref)

          let arg0 = this.valueToCode(block, 'VALUE', 0) || '0'
          arg0 = removeParens(arg0)
          arg0 = JSON.parse(arg0)
          return JSON.stringify([this.indent, [], '=', ref, arg0]) + ','
        }

    this.forBlock['calcium_attribute'] = this.forBlock[
      'calcium_attribute_repr'
    ] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || `["var", "self"]`
      ref = JSON.parse(removeParens(ref))
      let attr = ['attr']
      attr.push(ref) // remove keyword
      attr.push(block.getFieldValue('ATTR') || 'name')
      return [JSON.stringify(attr), 0]
    }

    this.forBlock['calcium_bitwise'] = (block) => {
      const op = block.getFieldValue('OP')
      let left = this.valueToCode(block, 'LEFT', 0) || '0'
      left = JSON.parse(removeParens(left))
      let right = this.valueToCode(block, 'RIGHT', 0) || '0'
      right = JSON.parse(removeParens(right))
      const code = JSON.stringify([op, left, right])
      return [code, 0]
    }

    // this.forBlock['calcium_bitwise_not'] = (block) => {
    //   let value = this.valueToCode(block, 'VALUE', 0) || '0'
    //   value = JSON.parse(removeParens(value))
    //   return [JSON.stringify(['~', value]), 0]
    // }

    this.forBlock['calcium_boolean'] = this.forBlock['calcium_boolean_repr'] = (
      block
    ) => {
      return [block.getFieldValue('VALUE'), 0]
    }

    this.forBlock['calcium_break_continue'] = this.forBlock[
      'calcium_break_continue_repr'
    ] = (block) => {
      return (
        JSON.stringify([this.indent, [], block.getFieldValue('FLOW')]) + ','
      )
    }

    this.forBlock['calcium_call'] = this.forBlock['calcium_call_repr'] = (
      block
    ) => {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = this.valueToCode(block, 'ARG' + i, 0) || 'null'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      let callRef = this.valueToCode(block, 'REF', 0) || `["var", "f"]`
      callRef = JSON.parse(callRef)

      return [JSON.stringify(['call', callRef, args]), 0]
    }

    this.forBlock['calcium_callnoreturn_repr'] = (block) => {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = this.valueToCode(block, 'ARG' + i, 0) || 'null'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      let callRef = this.valueToCode(block, 'REF', 0) || `["var", "f"]`
      callRef = JSON.parse(callRef)

      return (
        JSON.stringify([this.indent, [], 'expr', ['call', callRef, args]]) + ','
      )
    }

    this.forBlock['calcium_callreturn_repr'] = (block) => {
      let returnRef: any = null
      returnRef = this.valueToCode(block, 'RETURN', 0) || '["var", "x"]'
      returnRef = JSON.parse(returnRef)
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = this.valueToCode(block, 'ARG' + i, 0) || 'null'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      let callRef = this.valueToCode(block, 'REF', 0) || `["var", "f"]`
      callRef = JSON.parse(callRef)

      return (
        JSON.stringify([
          this.indent,
          [],
          '=',
          returnRef,
          ['call', callRef, args],
        ]) + ','
      )
    }

    this.forBlock['calcium_class_repr'] = (block) => {
      return [JSON.stringify(['var', block.getField('NAME')?.getText()]), 0]
    }

    this.forBlock['calcium_class_def'] = this.forBlock[
      'calcium_class_def_repr'
    ] = (block) => {
      const className = block.getFieldValue('NAME')
      let superclass = this.valueToCode(block, 'SUPERCLASS', 0) || 'null'
      superclass = JSON.parse(superclass) // ref or null

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([this.indent, [], 'pass']) + ','
      this.shiftIndent(-1)
      return (
        JSON.stringify([this.indent, [], 'class', className, superclass]) +
        ',' +
        stmts
      )
    }

    this.forBlock['calcium_comma'] = (block) => {
      let first = this.valueToCode(block, 'FIRST', 0) || '["var", "a"]'
      first = JSON.parse(first)
      let second = this.valueToCode(block, 'SECOND', 0) || '["var", "b"]'
      second = JSON.parse(second)
      return [JSON.stringify([',', first, second]), 0]
    }

    this.forBlock['calcium_compound_assign'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "x"]'
      ref = JSON.parse(removeParens(ref))
      const op = block.getFieldValue('OP')
      let value = this.valueToCode(block, 'VALUE', 0) || '0'
      value = JSON.parse(removeParens(value))
      return JSON.stringify([this.indent, [], op, ref, value]) + ','
    }

    this.forBlock['calcium_def'] = this.forBlock['calcium_def_repr'] = (
      block
    ) => {
      const funcName = block.getField('NAME')?.getText()
      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([this.indent, [], 'pass']) + ','
      this.shiftIndent(-1)

      const parameters: any = Reflect.get(block, 'parameters')
      return (
        JSON.stringify([this.indent, [], 'def', funcName, parameters]) +
        ',' +
        stmts
      )
    }

    this.forBlock['calcium_def_method'] = (block) => {
      const name = block.getField('NAME')?.getText()
      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([this.indent, [], 'pass']) + ','
      this.shiftIndent(-1)

      const parameters = Reflect.get(block, 'parameters') || []
      return (
        JSON.stringify([
          this.indent,
          [],
          'def',
          name,
          ['self', ...parameters],
        ]) +
        ',' +
        stmts
      )
    }
    this.forBlock['calcium_dict'] = this.forBlock['calcium_dict_repr'] = () => {
      return ['{}', 0]
    }

    this.forBlock['calcium_expr_stmt'] = (block) => {
      let call =
        this.valueToCode(block, 'CALL', 0) || '["call", ["var", "print"], [""]]'
      call = JSON.parse(call)
      return JSON.stringify([this.indent, [], 'expr', call]) + ','
    }

    this.forBlock['calcium_for'] = this.forBlock['calcium_for_repr'] = (
      block
    ) => {
      let vars = this.valueToCode(block, 'VARS', 0) || '["var", "i"]'
      vars = JSON.parse(vars)
      let iterable = this.valueToCode(block, 'ITER', 0) || '"Hello"'
      iterable = JSON.parse(removeParens(iterable))

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([this.indent, [], 'pass']) + ','
      this.shiftIndent(-1)

      return (
        JSON.stringify([this.indent, [], 'for', vars, iterable]) + ',' + stmts
      )
    }

    this.forBlock['calcium_for_range_repr'] = (block) => {
      let variable = this.valueToCode(block, 'VARS', 0) || '["var", "i"]'
      variable = JSON.parse(variable)

      let start: any = this.valueToCode(block, 'START', 0)
      if (!start) {
        start = null
      } else {
        start = JSON.parse(removeParens(start))
      }

      let stop: any = this.valueToCode(block, 'STOP', 0) || '10'
      stop = JSON.parse(removeParens(stop))

      let step: any = this.valueToCode(block, 'STEP', 0)
      if (!step) {
        step = null
      } else {
        step = JSON.parse(removeParens(step))
      }

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([this.indent, [], 'pass']) + ','
      this.shiftIndent(-1)
      let range: any[]
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
          this.indent,
          [],
          'for',
          variable,
          ['call', ['var', 'range'], range],
        ]) +
        ',' +
        stmts
      )
    }

    this.forBlock['calcium_function_repr'] = this.forBlock['calcium_class_repr']

    this.forBlock['calcium_if'] = this.forBlock['calcium_if_repr'] = (
      block
    ) => {
      let n = 0
      let codeArray = [[this.indent, [], 'ifs']]
      this.shiftIndent(1)
      let branchCode, conditionCode
      do {
        conditionCode = this.valueToCode(block, 'IF' + n, 0) || 'false'
        conditionCode = removeParens(conditionCode)
        codeArray.push([
          this.indent,
          [],
          n === 0 ? 'if' : 'elif',
          JSON.parse(conditionCode),
        ])
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'DO' + n) ||
          JSON.stringify([this.indent, [], 'pass']) + ','
        this.shiftIndent(-1)
        // branchCode needs "[" and "]" in order to be a valid JSON array.
        codeArray = codeArray.concat(
          JSON.parse('[' + removeComma(branchCode) + ']')
        )
        ++n
      } while (block.getInput('IF' + n))

      if (block.getInput('ELSE')) {
        codeArray.push([this.indent, [], 'else'])
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'ELSE') ||
          JSON.stringify([this.indent, [], 'pass']) + ','
        codeArray = codeArray.concat(
          JSON.parse('[' + removeComma(branchCode) + ']')
        )
        this.shiftIndent(-1)
      }
      this.shiftIndent(-1)
      const codeStr = JSON.stringify(codeArray)
      // remove outer "[" and "]".
      return codeStr.substring(1, codeStr.length - 1) + ','
    }

    this.forBlock['calcium_import'] = this.forBlock['calcium_import_repr'] = (
      block
    ) => {
      const moduleName = block.getField('NAME')?.getText()
      return JSON.stringify([this.indent, [], 'import', moduleName]) + ','
    }

    this.forBlock['calcium_kwarg'] = (block) => {
      const kw = block.getField('NAME')?.getText()
      let value = this.valueToCode(block, 'VALUE', 0) || '0'
      value = JSON.parse(removeParens(value))
      return [JSON.stringify(['kwarg', kw, value]), 0]
    }

    this.forBlock['calcium_list'] = this.forBlock['calcium_list_repr'] = (
      block
    ) => {
      const itemCount = Reflect.get(block, 'itemCount_')
      const elements = new Array(itemCount)
      for (let i = 0; i < itemCount; ++i) {
        let elem = this.valueToCode(block, 'ADD' + i, 0) || 'null'
        elem = removeParens(elem)
        elements[i] = elem
      }
      const code = '[[' + elements.join(', ') + ']]'
      return [code, 0]
    }

    this.forBlock['calcium_logical'] = this.forBlock['calcium_logical_repr'] =
      this.forBlock['calcium_bitwise']

    this.forBlock['calcium_method_repr'] = this.forBlock['calcium_attribute']

    this.forBlock['calcium_none'] = () => {
      return ['null', 0]
    }

    this.forBlock['calcium_not'] = this.forBlock['calcium_not_repr'] = (
      block
    ) => {
      let value = this.valueToCode(block, 'VALUE', 0) || 'true'
      value = JSON.parse(removeParens(value))
      return [JSON.stringify(['not', value]), 0]
    }

    this.forBlock['calcium_number'] = this.forBlock['pseudo_number'] = (
      block
    ) => {
      const numStr = block.getFieldValue('NUM') || '0'
      return [parseFullWidthNumber(numStr), 0]
    }

    this.forBlock['calcium_pass'] = () => {
      return JSON.stringify([this.indent, [], 'pass']) + ','
    }

    this.forBlock['calcium_print_repr'] = (block) => {
      let value = this.valueToCode(block, 'VALUE', 0) || '""'
      value = removeParens(value)
      value = JSON.parse(value)
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = this.valueToCode(block, 'ARG' + i, 0) || 'null'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      args.splice(0, 0, value)
      return (
        JSON.stringify([
          this.indent,
          [],
          'expr',
          ['call', ['var', 'print'], args],
        ]) + ','
      )
    }

    this.forBlock['calcium_relational'] = this.forBlock[
      'calcium_relational_repr'
    ] = this.forBlock['calcium_logical']

    this.forBlock['calcium_return'] = this.forBlock['calcium_return_repr'] = (
      block
    ) => {
      let value = this.valueToCode(block, 'VALUE', 0) || 'null'
      value = JSON.parse(removeParens(value))
      return JSON.stringify([this.indent, [], 'return', value]) + ','
    }

    this.forBlock['calcium_slice'] = this.forBlock['calcium_slice_repr'] = (
      block
    ) => {
      let start = this.valueToCode(block, 'START', 0) || '0'
      start = JSON.parse(removeParens(start))
      let end = this.valueToCode(block, 'END', 0) || '0'
      end = JSON.parse(removeParens(end))
      const code = JSON.stringify(['slice', start, end])
      return [code, 0]
    }

    this.forBlock['calcium_str'] =
      this.forBlock['calcium_str_repr'] =
      this.forBlock['pseudo_str'] =
        (block) => {
          let str = block.getField('STR')?.getText() || ''
          return [addDoubleQuote(str), 0]
        }

    this.forBlock['calcium_subscript'] = this.forBlock[
      'calcium_subscript_repr'
    ] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || `["var", "s"]`
      ref = JSON.parse(removeParens(ref))

      let subCode = this.valueToCode(block, 'SUB', 0) || '0'
      let sub = JSON.parse(removeParens(subCode))
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

    this.forBlock['calcium_variable'] =
      this.forBlock['calcium_variable_repr'] =
      this.forBlock['pseudo_variable'] =
        (block) => {
          return [JSON.stringify(['var', block.getField('NAME')?.getText()]), 0]
        }

    this.forBlock['calcium_while'] = this.forBlock['calcium_while_repr'] = (
      block
    ) => {
      let condition = this.valueToCode(block, 'COND', 0) || 'false'
      condition = JSON.parse(removeParens(condition))

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([this.indent, [], 'pass']) + ','
      this.shiftIndent(-1)

      return JSON.stringify([this.indent, [], 'while', condition]) + ',' + stmts
    }

    this.forBlock['pseudo_array'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      let sub = this.valueToCode(block, 'SUB', 0) || '0'
      sub = JSON.parse(removeParens(sub))

      const code = JSON.stringify(['sub', ref, sub])
      return [code, 0]
    }

    this.forBlock['pseudo_array_slice'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      let start = this.valueToCode(block, 'START', 0) || 'null'
      start = JSON.parse(removeParens(start))

      let endStr = this.valueToCode(block, 'END', 0) || 'null'
      let end = JSON.parse(removeParens(endStr))
      if (end !== null) {
        end = ['+', end, 1]
      }

      const code = JSON.stringify(['sub', ref, start, end])
      return [code, 0]
    }

    this.forBlock['pseudo_assign_array'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      const itemCount = Reflect.get(block, 'itemCount_')
      const elements = new Array(itemCount)
      for (let i = 0; i < itemCount; ++i) {
        let elem = this.valueToCode(block, 'ADD' + i, 0) || '0'
        elem = removeParens(elem)
        elements[i] = elem
      }
      let array = '[[' + elements.join(', ') + ']]'
      array = JSON.parse(array)
      return JSON.stringify([this.indent, [], '=', ref, array]) + ','
    }

    this.forBlock['pseudo_assign_zero'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      const forRange = [
        this.indent,
        [],
        'for',
        ['var', 'i'],
        ['call', ['var', 'range'], [['call', ['var', 'len'], [ref]]]],
      ]
      const assign = [this.indent + 1, [], '=', ['sub', ref, ['var', 'i']], 0]
      return `${JSON.stringify(forRange)},${JSON.stringify(assign)},`
    }

    this.forBlock['pseudo_int_input'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "data"]'
      ref = JSON.parse(removeParens(ref))

      const code = [
        this.indent,
        [],
        '=',
        ref,
        ['call', ['var', 'int'], [['call', ['var', 'input'], ['']]]],
      ]
      return JSON.stringify(code) + ','
    }

    this.forBlock['pseudo_str_input'] = (block) => {
      let ref = this.valueToCode(block, 'REF', 0) || '["var", "data"]'
      ref = JSON.parse(removeParens(ref))

      const code = [this.indent, [], '=', ref, ['call', ['var', 'input'], ['']]]
      return JSON.stringify(code) + ','
    }

    this.forBlock['pseudo_int'] = (block) => {
      let value = this.valueToCode(block, 'INT', 0) || '["var", "data"]'
      value = JSON.parse(removeParens(value))

      const code = ['call', ['var', 'int'], [value]]
      return [JSON.stringify(code), 0]
    }

    this.forBlock['pseudo_len'] = (block) => {
      let array = this.valueToCode(block, 'ARRAY', 0) || '[[]]'
      array = JSON.parse(removeParens(array))

      const code = ['call', ['var', 'len'], [array]]
      return [JSON.stringify(code), 0]
    }

    this.forBlock['pseudo_logical'] = this.forBlock['calcium_logical']

    this.forBlock['pseudo_random'] = (block) => {
      const code = ['call', ['attr', ['var', 'random'], 'random'], []]
      return [JSON.stringify(code), 0]
    }

    this.forBlock['pseudo_relational'] = this.forBlock['calcium_relational']

    this.forBlock['pseudo_print'] = (block) => {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = this.valueToCode(block, 'ARG' + i, 0) || '""'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      return (
        JSON.stringify([
          this.indent,
          [],
          'expr',
          ['call', ['var', 'print'], args],
        ]) + ','
      )
    }

    this.forBlock['pseudo_if'] = this.forBlock['calcium_if']

    const makeForLoop = (isIncrement: boolean) => {
      return (block: Blockly.Block) => {
        let variable = this.valueToCode(block, 'VAR', 0) || '["var", "i"]'
        variable = JSON.parse(variable)

        let startStr = this.valueToCode(block, 'START', 0)
        let start: number
        if (!startStr) {
          start = 0
        } else {
          start = JSON.parse(removeParens(startStr))
        }

        let stopStr = this.valueToCode(block, 'STOP', 0) || '9'
        let stop = JSON.parse(removeParens(stopStr))
        stop = ['+', stop, isIncrement ? 1 : -1]

        let stepStr = this.valueToCode(block, 'STEP', 0) || '1'
        let step: number | any[]
        if (!stepStr) {
          step = isIncrement ? 1 : -1
        } else {
          step = JSON.parse(removeParens(stepStr))
          step = isIncrement ? step : ['-_', step]
        }

        this.shiftIndent(1)
        const stmts =
          this.statementToCode(block, 'STMTS') ||
          JSON.stringify([this.indent, [], 'pass']) + ','
        this.shiftIndent(-1)
        const range = [start, stop, step]
        return (
          JSON.stringify([
            this.indent,
            [],
            'for',
            variable,
            ['call', ['var', 'range'], range],
          ]) +
          ',' +
          stmts
        )
      }
    }

    this.forBlock['pseudo_for_increment'] = makeForLoop(true)
    this.forBlock['pseudo_for_decrement'] = makeForLoop(false)

    this.forBlock['pseudo_while'] = this.forBlock['calcium_while']
  }

  init() {
    this.indent = 1
  }

  finish(code: string) {
    const start = JSON.stringify([1, [], '#', '0.0.5'])
    const importRandom = JSON.stringify([1, [], 'import', 'random'])
    const end = JSON.stringify([1, [], 'end'])
    return `[${start},${importRandom},${code}${end}]`
  }
  scrub_(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock()
    const nextCode = opt_thisOnly ? '' : this.blockToCode(nextBlock)
    return code + nextCode
  }

  scrubNakedValue() {
    return ''
  }

  /** add offset to indent for the next blocks. */
  shiftIndent(offset: number) {
    this.indent += offset
  }
}

function addDoubleQuote(s: string): string {
  let result = ''
  let i = 0
  while (i < s.length) {
    const char = s[i]
    if (char === '\\' && i === s.length - 1) {
      result += '\\\\\\\\'
      break
    }
    if (char === '\\' && s[i + 1] === '\\') {
      result += '\\\\\\\\'
      i += 2
      continue
    }
    if (char === '\\' && s[i + 1] === '"') {
      result += '\\\\\\"'
      i += 2
      continue
    }
    if (char === '\\') {
      result += '\\\\'
      i += 1
      continue
    }
    if (char === '"') {
      result += '\\\\\\"'
      i += 1
      continue
    }
    result += char
    i += 1
  }
  return `"${result}"`
}

function removeComma(codeStr: string): string {
  return codeStr.substring(0, codeStr.length - 1)
}

/**
 * removes surrounding parentheses.
 */
function removeParens(codeStr: string): string {
  let strWithoutParens = codeStr
  if (codeStr && codeStr[0] === '(') {
    strWithoutParens = codeStr.substring(1, codeStr.length - 1)
  }
  return strWithoutParens
}
