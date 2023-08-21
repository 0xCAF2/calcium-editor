import Blockly from 'blockly'
import { parseFullWidthNumber } from './utils'

export class PseudoGenerator extends Blockly.Generator {
  indent: number
  constructor(name: string) {
    super(name)
    this.indent = 1

    const self = this
    this.forBlock['calcium_add_repr'] = function (block) {
      const ref = self.valueToCode(block, 'REF', 0) || 'x'
      const value = self.valueToCode(block, 'VALUE', 0) || '1'
      return self.addIndent(`${ref} += ${value}`)
    }

    this.forBlock['calcium_arithmetic'] =
      this.forBlock['calcium_arithmetic_repr'] =
      this.forBlock['pseudo_arithmetic'] =
        function (block) {
          const op = block.getFieldValue('OP')
          const left = self.valueToCode(block, 'LEFT', 0) || 'i'
          const right = self.valueToCode(block, 'RIGHT', 0) || '1'
          const code = `${left} ${op} ${right}`
          return [code, 0]
        }

    this.forBlock['calcium_assign'] =
      this.forBlock['calcium_assign_repr'] =
      this.forBlock['pseudo_assign'] =
        function (block) {
          const ref = self.valueToCode(block, 'REF', 0) || 'x'
          const value = self.valueToCode(block, 'VALUE', 0) || '0'
          return self.addIndent(`${ref} = ${value}`)
        }

    this.forBlock['calcium_attribute'] = this.forBlock[
      'calcium_attribute_repr'
    ] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || `["var", "self"]`
      ref = JSON.parse(removeParens(ref))
      let attr = ['attr']
      attr.push(ref) // remove keyword
      attr.push(block.getFieldValue('ATTR') || 'name')
      return [JSON.stringify(attr), 0]
    }

    this.forBlock['calcium_bitwise'] = function (block) {
      const op = block.getFieldValue('OP')
      let left = self.valueToCode(block, 'LEFT', 0) || '0'
      left = JSON.parse(removeParens(left))
      let right = self.valueToCode(block, 'RIGHT', 0) || '0'
      right = JSON.parse(removeParens(right))
      const code = JSON.stringify([op, left, right])
      return [code, 0]
    }

    this.forBlock['calcium_bitwise_not'] = function (block) {
      let value = self.valueToCode(block, 'VALUE', 0) || '0'
      value = JSON.parse(removeParens(value))
      return [JSON.stringify(['~', value]), 0]
    }

    this.forBlock['calcium_boolean'] = this.forBlock['calcium_boolean_repr'] =
      function (block) {
        return [block.getFieldValue('VALUE'), 0]
      }

    this.forBlock['calcium_break_continue'] = this.forBlock[
      'calcium_break_continue_repr'
    ] = function (block) {
      return (
        JSON.stringify([self.indent, [], block.getFieldValue('FLOW')]) + ','
      )
    }

    this.forBlock['calcium_call'] = this.forBlock['calcium_call_repr'] =
      function (block) {
        const args: any[] = []
        const countOfArguments: number = Reflect.get(block, 'countOfArguments')
        for (let i = 0; i < countOfArguments; ++i) {
          let arg = self.valueToCode(block, 'ARG' + i, 0) || 'null'
          arg = removeParens(arg)
          args.push(JSON.parse(arg))
        }
        let callRef = self.valueToCode(block, 'REF', 0) || `["var", "f"]`
        callRef = JSON.parse(callRef)

        return [JSON.stringify(['call', callRef, args]), 0]
      }

    this.forBlock['calcium_callnoreturn_repr'] = function (block) {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = self.valueToCode(block, 'ARG' + i, 0) || 'null'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      let callRef = self.valueToCode(block, 'REF', 0) || `["var", "f"]`
      callRef = JSON.parse(callRef)

      return (
        JSON.stringify([self.indent, [], 'expr', ['call', callRef, args]]) + ','
      )
    }

    this.forBlock['calcium_callreturn_repr'] = function (block) {
      let returnRef: any = null
      returnRef = self.valueToCode(block, 'RETURN', 0) || 'null'
      returnRef = JSON.parse(returnRef)
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = self.valueToCode(block, 'ARG' + i, 0) || 'null'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      let callRef = self.valueToCode(block, 'REF', 0) || `["var", "f"]`
      callRef = JSON.parse(callRef)

      return (
        JSON.stringify([
          self.indent,
          [],
          '=',
          returnRef,
          ['call', callRef, args],
        ]) + ','
      )
    }

    this.forBlock['calcium_class_repr'] = function (block) {
      return [JSON.stringify(['var', block.getField('NAME')?.getText()]), 0]
    }

    this.forBlock['calcium_class_def'] = this.forBlock[
      'calcium_class_def_repr'
    ] = function (block) {
      const className = block.getFieldValue('NAME')
      let superclass = self.valueToCode(block, 'SUPERCLASS', 0) || 'null'
      superclass = JSON.parse(superclass) // ref or null

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([self.indent, [], 'pass']) + ','
      this.shiftIndent(-1)
      return (
        JSON.stringify([self.indent, [], 'class', className, superclass]) +
        ',' +
        stmts
      )
    }

    this.forBlock['calcium_comma'] = function (block) {
      let first = self.valueToCode(block, 'FIRST', 0) || '["var", "a"]'
      first = JSON.parse(first)
      let second = self.valueToCode(block, 'SECOND', 0) || '["var", "b"]'
      second = JSON.parse(second)
      return [JSON.stringify([',', first, second]), 0]
    }

    this.forBlock['calcium_compound_assign'] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || '["var", "x"]'
      ref = JSON.parse(removeParens(ref))
      const op = block.getFieldValue('OP')
      let value = self.valueToCode(block, 'VALUE', 0) || '0'
      value = JSON.parse(removeParens(value))
      return JSON.stringify([self.indent, [], op, ref, value]) + ','
    }

    this.forBlock['calcium_def'] = this.forBlock['calcium_def_repr'] =
      function (block) {
        const funcName = block.getField('NAME')?.getText()
        this.shiftIndent(1)
        const stmts =
          this.statementToCode(block, 'STMTS') ||
          JSON.stringify([self.indent, [], 'pass']) + ','
        this.shiftIndent(-1)

        const parameters: any = Reflect.get(block, 'parameters')
        return (
          JSON.stringify([self.indent, [], 'def', funcName, parameters]) +
          ',' +
          stmts
        )
      }

    this.forBlock['calcium_defmethod'] = this.forBlock[
      'calcium_defmethod_repr'
    ] = function (block) {
      const name = block.getField('NAME')?.getText()
      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([self.indent, [], 'pass']) + ','
      this.shiftIndent(-1)

      const parameters = Reflect.get(block, 'parameters') || []
      return (
        JSON.stringify([
          self.indent,
          [],
          'def',
          name,
          ['self', ...parameters],
        ]) +
        ',' +
        stmts
      )
    }
    this.forBlock['calcium_dict'] = this.forBlock['calcium_dict_repr'] =
      function () {
        return ['{}', 0]
      }

    this.forBlock['calcium_expr_stmt'] = function (block) {
      let call =
        self.valueToCode(block, 'CALL', 0) || '["call", ["var", "print"], [""]]'
      call = JSON.parse(call)
      return JSON.stringify([self.indent, [], 'expr', call]) + ','
    }

    this.forBlock['calcium_for'] = this.forBlock['calcium_for_repr'] =
      function (block) {
        let vars = self.valueToCode(block, 'VARS', 0) || '["var", "i"]'
        vars = JSON.parse(vars)
        let iterable = self.valueToCode(block, 'ITER', 0) || '"Hello"'
        iterable = JSON.parse(removeParens(iterable))

        this.shiftIndent(1)
        const stmts =
          this.statementToCode(block, 'STMTS') ||
          JSON.stringify([self.indent, [], 'pass']) + ','
        this.shiftIndent(-1)

        return (
          JSON.stringify([self.indent, [], 'for', vars, iterable]) + ',' + stmts
        )
      }

    this.forBlock['calcium_for_range_repr'] = function (block) {
      let variable = self.valueToCode(block, 'VARS', 0) || '["var", "i"]'
      variable = JSON.parse(variable)

      let start: string | null = self.valueToCode(block, 'START', 0)
      if (!start) {
        start = null
      } else {
        start = JSON.parse(removeParens(start))
      }

      let stop = self.valueToCode(block, 'STOP', 0) || '10'
      stop = JSON.parse(removeParens(stop))

      let step: string | null = self.valueToCode(block, 'STEP', 0)
      if (!step) {
        step = null
      } else {
        step = JSON.parse(removeParens(step))
      }

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        JSON.stringify([self.indent, [], 'pass']) + ','
      this.shiftIndent(-1)
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
          self.indent,
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

    this.forBlock['calcium_if'] = this.forBlock['calcium_if_repr'] = function (
      block
    ) {
      let n = 0
      let codeArray = [[self.indent, [], 'ifs']]
      this.shiftIndent(1)
      let branchCode, conditionCode
      do {
        conditionCode = self.valueToCode(block, 'IF' + n, 0) || 'false'
        conditionCode = removeParens(conditionCode)
        codeArray.push([
          self.indent,
          [],
          n === 0 ? 'if' : 'elif',
          JSON.parse(conditionCode),
        ])
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'DO' + n) ||
          JSON.stringify([self.indent, [], 'pass']) + ','
        this.shiftIndent(-1)
        // branchCode needs "[" and "]" in order to be a valid JSON array.
        codeArray = codeArray.concat(
          JSON.parse('[' + removeComma(branchCode) + ']')
        )
        ++n
      } while (block.getInput('IF' + n))

      if (block.getInput('ELSE')) {
        codeArray.push([self.indent, [], 'else'])
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'ELSE') ||
          JSON.stringify([self.indent, [], 'pass']) + ','
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

    this.forBlock['calcium_import'] = this.forBlock['calcium_import_repr'] =
      function (block) {
        const moduleName = block.getField('NAME')?.getText()
        return JSON.stringify([self.indent, [], 'import', moduleName]) + ','
      }

    this.forBlock['calcium_kwarg'] = function (block) {
      const kw = block.getField('NAME')?.getText()
      let value = self.valueToCode(block, 'VALUE', 0) || '0'
      value = JSON.parse(removeParens(value))
      return [JSON.stringify(['kwarg', kw, value]), 0]
    }

    this.forBlock['calcium_list'] = this.forBlock['calcium_list_repr'] =
      function (block) {
        const itemCount = Reflect.get(block, 'itemCount_')
        const elements = new Array(itemCount)
        for (let i = 0; i < itemCount; ++i) {
          let elem = self.valueToCode(block, 'ADD' + i, 0) || 'null'
          elem = removeParens(elem)
          elements[i] = elem
        }
        const code = '[[' + elements.join(', ') + ']]'
        return [code, 0]
      }

    this.forBlock['calcium_logical'] = this.forBlock['calcium_logical_repr'] =
      this.forBlock['calcium_bitwise']

    this.forBlock['calcium_method_repr'] = this.forBlock['calcium_attribute']

    this.forBlock['calcium_none'] = function () {
      return ['null', 0]
    }

    this.forBlock['calcium_not'] = this.forBlock['calcium_not_repr'] =
      function (block) {
        let value = self.valueToCode(block, 'VALUE', 0) || 'true'
        value = JSON.parse(removeParens(value))
        return [JSON.stringify(['not', value]), 0]
      }

    this.forBlock['calcium_number'] = this.forBlock['pseudo_number'] =
      function (block) {
        const numStr = block.getFieldValue('NUM') || '0'
        return [parseFullWidthNumber(numStr), 0]
      }

    this.forBlock['calcium_pass'] = function () {
      return JSON.stringify([self.indent, [], 'pass']) + ','
    }

    this.forBlock['calcium_print_repr'] = function (block) {
      let value = self.valueToCode(block, 'VALUE', 0) || '""'
      value = removeParens(value)
      value = JSON.parse(value)
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = self.valueToCode(block, 'ARG' + i, 0) || 'null'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      args.splice(0, 0, value)
      return (
        JSON.stringify([
          self.indent,
          [],
          'expr',
          ['call', ['var', 'print'], args],
        ]) + ','
      )
    }

    this.forBlock['calcium_relational'] = this.forBlock[
      'calcium_relational_repr'
    ] = this.forBlock['calcium_logical']

    this.forBlock['calcium_return'] = this.forBlock['calcium_return_repr'] =
      function (block) {
        let value = self.valueToCode(block, 'VALUE', 0) || 'null'
        value = JSON.parse(removeParens(value))
        return JSON.stringify([self.indent, [], 'return', value]) + ','
      }

    this.forBlock['calcium_slice'] = this.forBlock['calcium_slice_repr'] =
      function (block) {
        let start = self.valueToCode(block, 'START', 0) || 'null'
        start = JSON.parse(removeParens(start))
        let end = self.valueToCode(block, 'END', 0) || 'null'
        end = JSON.parse(removeParens(end))
        const code = JSON.stringify(['slice', start, end])
        return [code, 0]
      }

    this.forBlock['calcium_str'] =
      this.forBlock['calcium_str_repr'] =
      this.forBlock['pseudo_str'] =
        function (block) {
          let str = block.getField('STR')?.getText() || ''
          return [quote(str), 0]
        }

    this.forBlock['calcium_subscript'] = this.forBlock[
      'calcium_subscript_repr'
    ] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || `["var", "s"]`
      ref = JSON.parse(removeParens(ref))

      let subCode = self.valueToCode(block, 'SUB', 0) || '0'
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
        function (block) {
          return [JSON.stringify(['var', block.getField('NAME')?.getText()]), 0]
        }

    this.forBlock['calcium_while'] = this.forBlock['calcium_while_repr'] =
      function (block) {
        let condition = self.valueToCode(block, 'COND', 0) || 'false'
        condition = JSON.parse(removeParens(condition))

        this.shiftIndent(1)
        const stmts =
          this.statementToCode(block, 'STMTS') ||
          JSON.stringify([self.indent, [], 'pass']) + ','
        this.shiftIndent(-1)

        return (
          JSON.stringify([self.indent, [], 'while', condition]) + ',' + stmts
        )
      }

    this.forBlock['pseudo_array'] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      let sub = self.valueToCode(block, 'SUB', 0) || '0'
      sub = JSON.parse(removeParens(sub))

      const code = JSON.stringify(['sub', ref, sub])
      return [code, 0]
    }

    this.forBlock['pseudo_array_slice'] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      let start = self.valueToCode(block, 'START', 0) || 'null'
      start = JSON.parse(removeParens(start))

      let endStr = self.valueToCode(block, 'END', 0) || 'null'
      let end = JSON.parse(removeParens(endStr))
      if (end !== null) {
        end = ['+', end, 1]
      }

      const code = JSON.stringify(['sub', ref, start, end])
      return [code, 0]
    }

    this.forBlock['pseudo_assign_array'] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      const itemCount = Reflect.get(block, 'itemCount_')
      const elements = new Array(itemCount)
      for (let i = 0; i < itemCount; ++i) {
        let elem = self.valueToCode(block, 'ADD' + i, 0) || '0'
        elem = removeParens(elem)
        elements[i] = elem
      }
      let array = '[[' + elements.join(', ') + ']]'
      array = JSON.parse(array)
      return JSON.stringify([self.indent, [], '=', ref, array]) + ','
    }

    this.forBlock['pseudo_assign_zero'] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || '["var", "Data"]'
      ref = JSON.parse(removeParens(ref))

      const forRange = [
        self.indent,
        [],
        'for',
        ['var', 'i'],
        ['call', ['var', 'range'], [['call', ['var', 'len'], [ref]]]],
      ]
      const assign = [self.indent + 1, [], '=', ['sub', ref, ['var', 'i']], 0]
      return `${JSON.stringify(forRange)},${JSON.stringify(assign)},`
    }

    this.forBlock['pseudo_int_input'] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || '["var", "data"]'
      ref = JSON.parse(removeParens(ref))

      const code = [
        self.indent,
        [],
        '=',
        ref,
        ['call', ['var', 'int'], [['call', ['var', 'input'], ['']]]],
      ]
      return JSON.stringify(code) + ','
    }

    this.forBlock['pseudo_str_input'] = function (block) {
      let ref = self.valueToCode(block, 'REF', 0) || '["var", "data"]'
      ref = JSON.parse(removeParens(ref))

      const code = [self.indent, [], '=', ref, ['call', ['var', 'input'], ['']]]
      return JSON.stringify(code) + ','
    }

    this.forBlock['pseudo_int'] = function (block) {
      let value = self.valueToCode(block, 'INT', 0) || '["var", "data"]'
      value = JSON.parse(removeParens(value))

      const code = ['call', ['var', 'int'], [value]]
      return [JSON.stringify(code), 0]
    }

    this.forBlock['pseudo_len'] = function (block) {
      let array = self.valueToCode(block, 'ARRAY', 0) || '[[]]'
      array = JSON.parse(removeParens(array))

      const code = ['call', ['var', 'len'], [array]]
      return [JSON.stringify(code), 0]
    }

    this.forBlock['pseudo_random'] = function (block) {
      const code = ['call', ['attr', ['var', 'random'], 'random'], []]
      return [JSON.stringify(code), 0]
    }

    this.forBlock['pseudo_print'] = function (block) {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        let arg = self.valueToCode(block, 'ARG' + i, 0) || '""'
        arg = removeParens(arg)
        args.push(JSON.parse(arg))
      }
      return (
        JSON.stringify([
          self.indent,
          [],
          'expr',
          ['call', ['var', 'print'], args],
        ]) + ','
      )
    }

    this.forBlock['pseudo_if'] = this.forBlock['calcium_if']

    function makeForLoop(isIncrement) {
      return function (block) {
        let variable = self.valueToCode(block, 'VAR', 0) || '["var", "i"]'
        variable = JSON.parse(variable)

        let startStr = self.valueToCode(block, 'START', 0)
        let start: number
        if (!startStr) {
          start = 0
        } else {
          start = JSON.parse(removeParens(startStr))
        }

        let stopStr = self.valueToCode(block, 'STOP', 0) || '9'
        let stop = JSON.parse(removeParens(stopStr))
        stop = ['+', stop, isIncrement ? 1 : -1]

        let stepStr = self.valueToCode(block, 'STEP', 0) || '1'
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
          JSON.stringify([self.indent, [], 'pass']) + ','
        this.shiftIndent(-1)
        const range = [start, stop, step]
        return (
          JSON.stringify([
            self.indent,
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

  finish(code) {
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

  /** add prefix characters at beginning of each line */
  addIndent(code: string): string {
    const indent = '｜'.repeat(this.indent - 1)
    return indent + code + '\n'
  }
}
function quote(s: string): string {
  let str = s.replace(/\\/g, '\\\\').replace(/\n/g, '\\\n')

  const quote = '"'
  if (str.indexOf('"') !== -1) {
    str = str.replace(/"/g, '\\"')
  }
  return quote + str + quote
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
