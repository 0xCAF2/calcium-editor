import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock['calcium_print'] = (block) => {
  const args: any[] = []
  const countOfArguments: number = Reflect.get(block, 'countOfArguments')
  for (let i = 0; i < countOfArguments; ++i) {
    let arg = self.valueToCode(block, 'ARG' + i, 0) || '""'
    arg = trimParens(arg)
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
