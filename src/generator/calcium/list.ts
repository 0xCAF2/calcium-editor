import { calciumGenerator } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_list"] = (block) => {
  const length = Reflect.get(block, "itemCount_") as number
  const elements = new Array(length)
  for (let i = 0; i < length; ++i) {
    elements[i] = JSON.parse(self.valueToCode(block, "ITEM" + i, 0) || "null")
  }
  return [JSON.stringify(["list", elements]), 0]
}
