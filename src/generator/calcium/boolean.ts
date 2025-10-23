import { calciumGenerator } from "."

calciumGenerator.forBlock['calcium_boolean'] = (block) => {
  return [block.getFieldValue('VALUE'), 0]
}
