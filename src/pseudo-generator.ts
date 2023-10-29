import Blockly from 'blockly'
import { parseFullWidthNumber } from './util'

export class PseudoGenerator extends Blockly.Generator {
  indent: number
  constructor(name: string) {
    super(name)
    this.indent = 1

    this.forBlock['calcium_arithmetic'] =
      this.forBlock['calcium_logical'] =
      this.forBlock['calcium_relational'] =
      this.forBlock['pseudo_arithmetic'] =
      this.forBlock['pseudo_logical'] =
      this.forBlock['pseudo_relational'] =
        (block) => {
          const code = this.convertToCode(block)
          return [code, 0]
        }

    this.forBlock['calcium_assign'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'n'
      const value = this.valueToCode(block, 'VALUE', 0) || '0'
      return this.addPseudoIndent('assign', `${ref} = ${value}`)
    }

    this.forBlock['pseudo_assign'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'n'
      const value = this.valueToCode(block, 'VALUE', 0) || '0'
      return this.addPseudoIndent('assign', `${ref} = ${value}`)
    }

    this.forBlock['calcium_attribute'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 'self'
      const attr = block.getFieldValue('ATTR') || 'name'
      return [`${ref}.${attr}`, 0]
    }

    // this.forBlock['calcium_bitwise_not'] = (block) => {
    //   const value = this.valueToCode(block, 'VALUE', 0) || '0'
    //   return [`~${value}`, 0]
    // }

    this.forBlock['calcium_boolean'] = (block) => {
      const value = block.getFieldValue('VALUE') === 'true' ? 'True' : 'False'
      return [value, 0]
    }

    this.forBlock['calcium_break_continue'] = (block) => {
      return this.addPseudoIndent('break_continue', block.getFieldValue('FLOW'))
    }

    this.forBlock['calcium_call'] = (block) => {
      const args: any[] = []
      const countOfArguments: number = Reflect.get(block, 'countOfArguments')
      for (let i = 0; i < countOfArguments; ++i) {
        const arg = this.valueToCode(block, 'ARG' + i, 0) || 'None'
        args.push(arg)
      }
      const callRef = this.valueToCode(block, 'REF', 0) || 'f'
      return [`${callRef}(${args.join(', ')})`, 0]
    }

    this.forBlock['calcium_class_def'] = (block) => {
      const className = block.getFieldValue('NAME')
      const superclass = this.valueToCode(block, 'SUPERCLASS', 0) || null

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        this.addPseudoIndent('pass', 'pass')
      this.shiftIndent(-1)
      return (
        this.addPseudoIndent(
          'class',
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
      return this.addPseudoIndent('assign', `${ref} ${op} ${value}`)
    }

    this.forBlock['calcium_def'] = (block) => {
      const funcName = block.getField('NAME')?.getText()
      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        this.addPseudoIndent('pass', 'pass')
      this.shiftIndent(-1)

      const parameters: any[] = Reflect.get(block, 'parameters') || []
      return (
        this.addPseudoIndent(
          'def',
          `def ${funcName}(${parameters.join(', ')}):`
        ) + stmts
      )
    }

    this.forBlock['calcium_def_method'] = (block) => {
      const name = block.getField('NAME')?.getText()
      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        this.addPseudoIndent('pass', 'pass')
      this.shiftIndent(-1)

      const parameters: any[] = Reflect.get(block, 'parameters') || []
      return (
        this.addPseudoIndent(
          'def',
          `def ${name}(${['self', ...parameters].join(', ')}):`
        ) + stmts
      )
    }

    this.forBlock['calcium_dict'] = () => {
      return ['{}', 0]
    }

    this.forBlock['calcium_expr_stmt'] = (block) => {
      const call = this.valueToCode(block, 'CALL', 0)
      return this.addPseudoIndent('call', call)
    }

    // TODO: edit here
    this.forBlock['calcium_for'] = (block) => {
      const vars = this.valueToCode(block, 'VARS', 0) || 's'
      const iterable = this.valueToCode(block, 'ITER', 0) || '"Hello"'

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        this.addPseudoIndent('pass', 'pass')
      this.shiftIndent(-1)

      return this.addPseudoIndent('for', `for ${vars} in ${iterable}:`) + stmts
    }

    this.forBlock['calcium_if'] = (block) => {
      let n = 0
      let code: string = ''
      let branchCode: string, conditionCode: string
      do {
        const ifOrElif = n === 0 ? 'if' : 'elif'
        conditionCode = this.valueToCode(block, 'IF' + n, 0) || 'False'
        code += this.addPseudoIndent(ifOrElif, `${ifOrElif} ${conditionCode}:`)
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'DO' + n) ||
          this.addPseudoIndent('pass', 'pass')
        this.shiftIndent(-1)
        code += branchCode
        ++n
      } while (block.getInput('IF' + n))

      if (block.getInput('ELSE')) {
        code += this.addPseudoIndent('else', 'else:')
        this.shiftIndent(1)
        branchCode =
          this.statementToCode(block, 'ELSE') ||
          this.addPseudoIndent('pass', 'pass')
        this.shiftIndent(-1)
        code += branchCode
      }
      return code
    }

    this.forBlock['calcium_import'] = (block) => {
      const moduleName = block.getField('NAME')?.getText()
      return this.addPseudoIndent('import', `import ${moduleName}`)
    }

    this.forBlock['calcium_kwarg'] = (block) => {
      const kw = block.getField('NAME')?.getText()
      const value = this.valueToCode(block, 'VALUE', 0) || '0'
      return [`${kw}=${value}`, 0]
    }

    this.forBlock['calcium_list'] = (block) => {
      const itemCount = Reflect.get(block, 'itemCount_')
      const elements = new Array(itemCount)
      for (let i = 0; i < itemCount; ++i) {
        const elem = this.valueToCode(block, 'ADD' + i, 0) || 'None'
        elements[i] = elem
      }
      const code = `[${elements.join(', ')}]`
      return [code, 0]
    }

    this.forBlock['calcium_none'] = () => {
      return ['None', 0]
    }

    this.forBlock['calcium_not'] = (block) => {
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
      return this.addPseudoIndent('pass', 'pass')
    }

    this.forBlock['calcium_return'] = (block) => {
      let value = this.valueToCode(block, 'VALUE', 0) || 'None'
      return this.addPseudoIndent('return', `return ${value}`)
    }

    this.forBlock['calcium_slice'] = (block) => {
      const start = this.valueToCode(block, 'START', 0) || '0'
      const end = this.valueToCode(block, 'END', 0) || '0'
      const code = `${start}:${end}`
      return [code, 0]
    }

    this.forBlock['calcium_str'] = this.forBlock['pseudo_str'] = (block) => {
      let str = block.getField('STR')?.getText() || ''
      return [`"${escape(str)}"`, 0]
    }

    this.forBlock['calcium_subscript'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || `array`
      const subCode = this.valueToCode(block, 'SUB', 0) || '0'
      const code = `${ref}[${subCode}]`
      return [code, 0]
    }

    this.forBlock['calcium_variable'] = this.forBlock['pseudo_variable'] = (
      block
    ) => {
      return [block.getField('NAME')?.getText().trimStart() || 'n', 0]
    }

    this.forBlock['calcium_while'] = (block) => {
      const condition = this.valueToCode(block, 'COND', 0) || 'False'

      this.shiftIndent(1)
      const stmts =
        this.statementToCode(block, 'STMTS') ||
        this.addPseudoIndent('pass', 'pass')
      this.shiftIndent(-1)

      return this.addPseudoIndent('while', `while ${condition}:`) + stmts
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
      return this.addPseudoIndent('assign', `${ref} = 【外部からの入力（数）】`)
    }

    this.forBlock['pseudo_str_input'] = (block) => {
      const ref = this.valueToCode(block, 'REF', 0) || 's'
      return this.addPseudoIndent(
        'assign',
        `${ref} = 【外部からの入力（文字列）】`
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

    this.forBlock['pseudo_random'] = () => {
      return ['乱数()', 0]
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
      if (line.indent > 1) {
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

    return `${lines
      .map((v) => {
        return `${v.leading ?? ''}${v.code}`
      })
      .join('\n')}`
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

  convertToCode(block: Blockly.Block): string {
    const op = getOperator(block)
    const left = this.addParenToExpr(block, 'LEFT', 'i')
    const right = this.addParenToExpr(block, 'RIGHT', '1')
    return `${left} ${op} ${right}`
  }

  addParenToExpr(block: Blockly.Block, name: string, initial: string): string {
    let code = this.valueToCode(block, name, 0) || initial
    const blockType = block.getInputTargetBlock(name)?.type
    if (needsParen(blockType)) {
      code = `(${code})`
    }
    return code
  }
}

function escape(s: string): string {
  let result = ''
  let i = 0
  while (i < s.length) {
    const char = s[i]
    if (char === '\\' && i === s.length - 1) {
      result += '\\\\'
      break
    }
    if (char === '\\' && s[i + 1] === '\\') {
      result += '\\\\'
      i += 2
      continue
    }
    if (char === '\\' && s[i + 1] === '"') {
      result += '\\"'
      i += 2
      continue
    }
    if (char === '"') {
      result += '\\"'
      i += 1
      continue
    }
    result += char
    i += 1
  }
  return result
}

function needsParen(blockType?: string) {
  return (
    blockType === 'calcium_arithmetic' ||
    blockType === 'calcium_logical' ||
    blockType === 'calcium_relational' ||
    blockType === 'pseudo_arithmetic' ||
    blockType === 'pseudo_logical' ||
    blockType === 'pseudo_relational'
  )
}

function getOperator(block: Blockly.Block): string {
  let op = block.getFieldValue('OP')
  if (block.type === 'pseudo_arithmetic' && op === '//') {
    op = '÷'
  }
  return op
}

type Line = { keyword: string; indent: number; code: string; leading?: string }

type Keyword =
  | 'assign'
  | 'call'
  | 'if'
  | 'elif'
  | 'else'
  | 'for'
  | 'while'
  | 'pass'
  | 'end'
  | 'break_continue'
  | 'return'
  | 'class'
  | 'def'
  | 'import'
