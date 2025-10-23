import { calciumGenerator, trimParens } from '.'

const self = calciumGenerator

calciumGenerator.forBlock['calcium_call'] = (block) => {
  const args: any[] = []
  const countOfArguments: number = Reflect.get(block, 'countOfArguments')
  for (let i = 0; i < countOfArguments; ++i) {
    let arg = self.valueToCode(block, 'ARG' + i, 0) || 'null'
    arg = trimParens(arg)
    args.push(JSON.parse(arg))
  }
  const calleeStr = self.valueToCode(block, 'REF', 0) || `["var", "print"]`
  const calleeRef = JSON.parse(calleeStr)

  return [JSON.stringify(['call', calleeRef, args]), 0]
}
