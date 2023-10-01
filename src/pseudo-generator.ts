import Blockly from 'blockly'
import { parseFullWidthNumber } from './utils'

export class PseudoGenerator extends Blockly.Generator {
  indent: number
  constructor(name: string) {
    super(name)
    this.indent = 1

    this.forBlock['calcium_add_repr'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'n'
      const value = this.valueToCode(block, 'VALUE', 0) || '1'
      return this.addIndent(`${ref} += ${value}`)
    }

    this.forBlock['calcium_arithmetic'] =
      this.forBlock['calcium_arithmetic_repr'] =
      this.forBlock['pseudo_arithmetic'] =
        (block) => {
          const op = block.getFieldValue('OP')
          const left = this.valueToCode(block, 'LEFT', 0) || 'i'
          const right = this.valueToCode(block, 'RIGHT', 0) || '1'
          const code = `${left} ${op} ${right}`
          return [code, 0]
        }

    this.forBlock['calcium_assign'] = this.forBlock['calcium_assign_repr'] = (
      block
    ) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'n'
      const value = this.valueToCode(block, 'VALUE', 0) || '0'
      return this.addIndent(`${ref} = ${value}`)
    }

    this.forBlock['pseudo_assign'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'n'
      const value = this.valueToCode(block, 'VALUE', 0) || '0'
      return this.addPseudoIndent('assign', `${ref} = ${value}`)
    }

    this.forBlock['calcium_attribute'] = this.forBlock[
      'calcium_attribute_repr'
    ] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'self'
      const attr = block.getFieldValue('ATTR') || 'name'
      return [`${ref}.${attr}`, 0]
    }

    this.forBlock['calcium_bitwise'] = (block) => {
      const op = block.getFieldValue('OP')
      const left = this.valueToCode(block, 'LEFT', 0) || '1'
      const right = this.valueToCode(block, 'RIGHT', 0) || '0'
      const code = `${left} ${op} ${right}`
      return [code, 0]
    }

    this.forBlock['calcium_bitwise_not'] = (block) => {
      const value = this.valueToCode(block, 'VALUE', 0) || '0'
      return [`~${value}`, 0]
    }

    this.forBlock['calcium_boolean'] = this.forBlock['calcium_boolean_repr'] = (
      block
    ) => {
      const value = block.getFieldValue('VALUE') === 'true' ? 'True' : 'False'
      return [value, 0]
    }

    this.forBlock['calcium_break_continue'] = this.forBlock[
      'calcium_break_continue_repr'
    ] = (block) => {
      return this.addIndent(block.getFieldValue('FLOW'))
    }

    this.forBlock['calcium_call'] = this.forBlock['calcium_call_repr'] = (
      block
    ) => {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        const arg = this.valueToCode(block, 'ARG' + i, 0) || 'None'
        args.push(arg)
      }
      const callRef = this.valueToCode(block, 'REF', 0) || 'f'
      return [`${callRef}(${args.join(', ')})`, 0]
    }

    this.forBlock['calcium_callnoreturn_repr'] = (block) => {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        const arg = this.valueToCode(block, 'ARG' + i, 0) || 'None'
        args.push(arg)
      }
      const callRef = this.valueToCode(block, 'REF', 0) || 'f'
      return this.addIndent(`${callRef}(${args.join(', ')})`)
    }

    this.forBlock['calcium_callreturn_repr'] = (block) => {
      const returnRef = this.valueToCode(block, 'RETURN', 0) || 'x'
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        const arg = this.valueToCode(block, 'ARG' + i, 0) || 'None'
        args.push(arg)
      }
      const callRef = this.valueToCode(block, 'REF', 0) || 'f'
      return this.addIndent(`${returnRef} = ${callRef}(${args.join(', ')})`)
    }

    this.forBlock['calcium_class_repr'] = (block) => {
      return [block.getField('NAME')?.getText() ?? 'MyClass', 0]
    }

    this.forBlock['calcium_class_def'] = this.forBlock[
      'calcium_class_def_repr'
    ] = (block) => {
      const className = block.getFieldValue('NAME')
      const superclass = this.valueToCode(block, 'SUPERCLASS', 0) || null

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') || this.addIndent('pass')
      this.shiftIndent(-1)
      return (
        this.addIndent(
          `class ${className}${superclass ? `(${superclass})` : ''}`
        ) + stmts
      )
    }

    this.forBlock['calcium_comma'] = (block) => {
      const first = this.valueToCode(block, 'FIRST', 0) || 'a'
      const second = this.valueToCode(block, 'SECOND', 0) || 'b'
      return [`${first}, ${second}`, 0]
    }

    this.forBlock['calcium_compound_assign'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'x'
      const op = block.getFieldValue('OP')
      const value = this.valueToCode(block, 'VALUE', 0) || '1'
      return this.addIndent(`${ref} ${op} ${value}`)
    }

    this.forBlock['calcium_def'] = this.forBlock['calcium_def_repr'] = (
      block
    ) => {
      const funcName = block.getField('NAME')?.getText()
      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') || this.addIndent('pass')
      this.shiftIndent(-1)

      const parameters: any[] = Reflect.get(block, 'parameters') || []
      return (
        this.addIndent(`def ${funcName}(${parameters.join(', ')}):`) + stmts
      )
    }

    this.forBlock['calcium_defmethod'] = this.forBlock[
      'calcium_defmethod_repr'
    ] = (block) => {
      const name = block.getField('NAME')?.getText()
      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') || this.addIndent(`pass`)
      this.shiftIndent(-1)

      const parameters: any[] = Reflect.get(block, 'parameters') || []
      parameters.unshift('self')
      return this.addIndent(`def ${name}(${parameters.join(', ')}):`) + stmts
    }

    this.forBlock['calcium_dict'] = this.forBlock['calcium_dict_repr'] = () => {
      return ['{}', 0]
    }

    this.forBlock['calcium_expr_stmt'] = (block) => {
      const call = this.valueToCode(block, 'CALL', 0)
      return this.addIndent(call)
    }

    // TODO: edit here
    this.forBlock['calcium_for'] = this.forBlock['calcium_for_repr'] = (
      block
    ) => {
      const vars = this.valueToCode(block, 'VARS', 0) || 's'
      const iterable = this.valueToCode(block, 'ITER', 0) || '"Hello"'

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') || this.addIndent('pass')
      this.shiftIndent(-1)

      return this.addIndent(`for ${vars} in ${iterable}:`) + stmts
    }

    this.forBlock['calcium_for_range_repr'] = (block) => {
      const variable = this.valueToCode(block, 'VARS', 0) || 'i'

      let start: string | null = this.valueToCode(block, 'START', 0)
      if (!start) {
        start = null
      }

      const stop = this.valueToCode(block, 'STOP', 0) || '10'

      let step: string | null = this.valueToCode(block, 'STEP', 0)
      if (!step) {
        step = null
      }

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') || this.addIndent('pass')
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
        this.addIndent(`for ${variable} in range(${range.join(', ')}):`) + stmts
      )
    }

    this.forBlock['calcium_function_repr'] = this.forBlock['calcium_class_repr']

    this.forBlock['calcium_if'] = this.forBlock['calcium_if_repr'] = (
      block
    ) => {
      let n = 0
      let code: string = ''
      this.shiftIndent(1)
      let branchCode: string, conditionCode: string
      do {
        const ifOrElif = n === 0 ? 'if' : 'elif'
        conditionCode = this.valueToCode(block, 'IF' + n, 0) || 'False'
        code += this.addIndent(`${ifOrElif} ${conditionCode}:`)
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'DO' + n) || this.addIndent('pass')
        this.shiftIndent(-1)
        code += branchCode
        ++n
      } while (block.getInput('IF' + n))

      if (block.getInput('ELSE')) {
        code += this.addIndent('else:')
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'ELSE') || this.addIndent('pass')
        this.shiftIndent(-1)
        code += branchCode
      }
      this.shiftIndent(-1)
      return code
    }

    this.forBlock['calcium_import'] = this.forBlock['calcium_import_repr'] = (
      block
    ) => {
      const moduleName = block.getField('NAME')?.getText()
      return this.addIndent(`import ${moduleName}`)
    }

    this.forBlock['calcium_kwarg'] = (block) => {
      const kw = block.getField('NAME')?.getText()
      const value = this.valueToCode(block, 'VALUE', 0) || '0'
      return [`${kw}=${value}`, 0]
    }

    this.forBlock['calcium_list'] = this.forBlock['calcium_list_repr'] = (
      block
    ) => {
      const itemCount = Reflect.get(block, 'itemCount_')
      const elements = new Array(itemCount)
      for (let i = 0; i < itemCount; ++i) {
        const elem = this.valueToCode(block, 'ADD' + i, 0) || 'None'
        elements[i] = elem
      }
      const code = `[${elements.join(', ')}]`
      return [code, 0]
    }

    this.forBlock['calcium_logical'] = this.forBlock['calcium_logical_repr'] =
      this.forBlock['calcium_bitwise']

    this.forBlock['calcium_method_repr'] = this.forBlock['calcium_attribute']

    this.forBlock['calcium_none'] = () => {
      return ['None', 0]
    }

    this.forBlock['calcium_not'] = this.forBlock['calcium_not_repr'] = (
      block
    ) => {
      const value = this.valueToCode(block, 'VALUE', 0) || 'True'
      return [`not ${value}`, 0]
    }

    this.forBlock['calcium_number'] = this.forBlock['pseudo_number'] = (
      block
    ) => {
      const numStr = block.getFieldValue('NUM') || '0'
      return [parseFullWidthNumber(numStr), 0]
    }

    this.forBlock['calcium_pass'] = () => {
      return this.addIndent('pass')
    }

    this.forBlock['calcium_print_repr'] = (block) => {
      const value = this.valueToCode(block, 'VALUE', 0) || '""'
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        const arg = this.valueToCode(block, 'ARG' + i, 0) || 'None'
        args.push(arg)
      }
      args.splice(0, 0, value)
      return this.addIndent(`print(${args.join(', ')})`)
    }

    this.forBlock['calcium_relational'] = this.forBlock[
      'calcium_relational_repr'
    ] = this.forBlock['calcium_logical']

    this.forBlock['calcium_return'] = this.forBlock['calcium_return_repr'] = (
      block
    ) => {
      let value = this.valueToCode(block, 'VALUE', 0) || 'None'
      return this.addIndent(`return ${value}`)
    }

    this.forBlock['calcium_slice'] = this.forBlock['calcium_slice_repr'] = (
      block
    ) => {
      const start = this.valueToCode(block, 'START', 0) || '0'
      const end = this.valueToCode(block, 'END', 0) || '0'
      const code = `${start}:${end}`
      return [code, 0]
    }

    this.forBlock['calcium_str'] =
      this.forBlock['calcium_str_repr'] =
      this.forBlock['pseudo_str'] =
        (block) => {
          let str = block.getField('STR')?.getText() || ''
          return [quote(str), 0]
        }

    this.forBlock['calcium_subscript'] = this.forBlock[
      'calcium_subscript_repr'
    ] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || `array`
      const subCode = this.valueToCode(block, 'SUB', 0) || '0'
      const code = `${ref}[${subCode}]`
      return [code, 0]
    }

    this.forBlock['calcium_variable'] =
      this.forBlock['calcium_variable_repr'] =
      this.forBlock['pseudo_variable'] =
        (block) => {
          return [block.getField('NAME')?.getText().trimStart() || 'n', 0]
        }

    this.forBlock['calcium_while'] = this.forBlock['calcium_while_repr'] = (
      block
    ) => {
      const condition = this.valueToCode(block, 'COND', 0) || 'False'

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') || this.addIndent('pass')
      this.shiftIndent(-1)

      return this.addIndent(`while ${condition}:`) + stmts
    }

    this.forBlock['pseudo_array'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'Data'
      const sub = this.valueToCode(block, 'SUB', 0) || '0'
      const code = `${ref}[${sub}]`
      return [code, 0]
    }

    this.forBlock['pseudo_array_slice'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'Data'
      const start = this.valueToCode(block, 'START', 0) || '0'
      let end = this.valueToCode(block, 'END', 0) || '0'
      end += ' + 1'
      const code = `${ref}[${start}:${end}]`
      return [code, 0]
    }

    this.forBlock['pseudo_assign_array'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'Data'
      const itemCount = Reflect.get(block, 'itemCount_')
      const elements = new Array(itemCount)
      for (let i = 0; i < itemCount; ++i) {
        const elem = this.valueToCode(block, 'ADD' + i, 0) || '0'
        elements[i] = elem
      }
      const array = `[${elements.join(', ')}]`
      return this.addPseudoIndent('assign', `${ref} = ${array}`)
    }

    this.forBlock['pseudo_assign_zero'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'Data'
      return this.addPseudoIndent('assign', `${ref} のすべての値を0にする`)
    }

    this.forBlock['pseudo_int_input'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'n'
      return this.addPseudoIndent('assign', `${ref} =【外部からの入力（数）】`)
    }

    this.forBlock['pseudo_str_input'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 's'
      return this.addPseudoIndent(
        'assign',
        `${ref} =【外部からの入力（文字列）】`
      )
    }

    this.forBlock['pseudo_int'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'n'
      return [`整数(${ref})`, 0]
    }

    this.forBlock['pseudo_len'] = (block) => {
      const array = this.valueToCode(block, 'ARRAY', 0) || 'Data'
      return [`要素数(${array})`, 0]
    }

    this.forBlock['pseudo_logical'] = (block) => {
      const left = this.valueToCode(block, 'LEFT', 0) || 'False'
      const right = this.valueToCode(block, 'RIGHT', 0) || 'False'
      const op = block.getFieldValue('OP')
      return [`${left} ${op} ${right}`, 0]
    }

    this.forBlock['pseudo_random'] = () => {
      return ['乱数()', 0]
    }

    this.forBlock['pseudo_relational'] = (block) => {
      const left = this.valueToCode(block, 'LEFT', 0) || '0'
      const right = this.valueToCode(block, 'RIGHT', 0) || '0'
      const op = block.getFieldValue('OP')
      return [`${left} ${op} ${right}`, 0]
    }

    this.forBlock['pseudo_print'] = (block) => {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        const arg = this.valueToCode(block, 'ARG' + i, 0) || '""'
        args.push(arg)
      }
      return this.addPseudoIndent('call', `表示する(${args.join(', ')})`)
    }

    this.forBlock['pseudo_if'] = (block) => {
      let n = 0
      let code: string = ''
      let branchCode: string, conditionCode: string
      do {
        const isIfStmt = n === 0
        const prefixKeyword = isIfStmt ? 'もし' : 'そうでなくもし'
        conditionCode = this.valueToCode(block, 'IF' + n, 0) || 'False'
        code += this.addPseudoIndent(
          isIfStmt ? 'if' : 'elif',
          `${prefixKeyword} ${conditionCode} ならば:`
        )
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'DO' + n) ||
          this.addPseudoIndent('pass', 'pass')
        this.shiftIndent(-1)
        code += branchCode
        ++n
      } while (block.getInput('IF' + n))

      if (block.getInput('ELSE')) {
        code += this.addPseudoIndent('else', 'そうでなければ:')
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'ELSE') ||
          this.addPseudoIndent('pass', 'pass')
        this.shiftIndent(-1)
        code += branchCode
      }
      return code
    }

    const makeForLoop = (isIncrement: boolean) => {
      return (block: Blockly.Block) => {
        const variable = this.valueToCode(block, 'VAR', 0) || 'i'

        const start = this.valueToCode(block, 'START', 0)

        const stop = this.valueToCode(block, 'STOP', 0) || '9'

        const step = this.valueToCode(block, 'STEP', 0) || '1'

        this.shiftIndent(1)
        const stmts =
          this.statementToCode(block, 'STMTS') ||
          this.addPseudoIndent('pass', 'pass')
        this.shiftIndent(-1)
        return (
          this.addPseudoIndent(
            'for',
            `${variable} を ${start} から ${stop} まで ${step} ずつ ` +
              (isIncrement ? '増やしながら' : '減らしながら') +
              '繰り返す:'
          ) + stmts
        )
      }
    }

    this.forBlock['pseudo_for_increment'] = makeForLoop(true)
    this.forBlock['pseudo_for_decrement'] = makeForLoop(false)

    this.forBlock['pseudo_while'] = (block) => {
      const condition = this.valueToCode(block, 'COND', 0) || 'False'

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        this.addPseudoIndent('pass', 'pass')
      this.shiftIndent(-1)

      return this.addPseudoIndent('while', `${condition} の間繰り返す:`) + stmts
    }
  }

  init() {
    this.indent = 1
  }

  finish(code: string) {
    const blockPrefix = '｜'
    const endPrefix = '⎿'
    // remove last comma
    const lines: Line[] = JSON.parse(`[${code.substring(0, code.length - 1)}]`)

    const setLeadingChars = (line: Line) => {
      if (line.keyword !== 'py' && line.indent > 1) {
        line.leading = blockPrefix.repeat(line.indent - 1)
      }
    }
    for (let line of lines) {
      setLeadingChars(line)
    }

    const replaceFromRight = (
      currentIndent: number,
      nextIndent: number
    ): string => {
      let result = ''
      for (let i = nextIndent; i < currentIndent; ++i) {
        result += endPrefix
      }
      const endLength = result.length
      for (let i = 0; i < currentIndent - 1 - endLength; ++i) {
        result = blockPrefix + result
      }
      return result
    }

    // add the last line
    lines.push({ keyword: 'end', indent: 1, code: '' })
    const replaceEndPrefix = (current: Line, next: Line) => {
      if (!(next.keyword === 'elif' || next.keyword === 'else')) {
        current.leading = replaceFromRight(current.indent, next.indent)
      } else if (current.indent - next.indent > 1) {
        current.leading = replaceFromRight(current.indent, next.indent + 1)
      }
    }
    for (let i = lines.length - 1; i > 0; --i) {
      replaceEndPrefix(lines[i - 1], lines[i])
    }
    // remove the last line
    lines.pop()

    return `＜プログラムの先頭＞\n${lines
      .map((v) => {
        return `${v.leading ?? ''}${v.code}`
      })
      .join('\n')}\n＜プログラムの終わり＞`
  }

  scrub_(block: Blockly.Block, code: string, opt_thisOnly: boolean) {
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

  /** add characters at beginning of each line */
  addPseudoIndent(keyword: Keyword, code: string): string {
    return JSON.stringify({ keyword, indent: this.indent, code }) + ','
  }

  /** add spaces at beginning of each line */
  addIndent(code: string): string {
    return JSON.stringify({ keyword: 'py', indent: this.indent, code }) + ','
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

type Line = { keyword: string; indent: number; code: string; leading?: string }

type Keyword =
  | 'py'
  | 'assign'
  | 'call'
  | 'if'
  | 'elif'
  | 'else'
  | 'for'
  | 'while'
  | 'pass'
  | 'end'
