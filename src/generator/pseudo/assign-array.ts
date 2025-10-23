import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_assign_array"] = (block) => {
  let ref = self.valueToCode(block, "REF", 0) || '["var", "Data"]'
  ref = JSON.parse(trimParens(ref))

  const itemCount = Reflect.get(block, "itemCount_")
  const elements = new Array(itemCount)
  for (let i = 0; i < itemCount; ++i) {
    let elem = self.valueToCode(block, "ITEM" + i, 0) || '["num", "0"]'
    elem = trimParens(elem)
    elements[i] = elem
  }
  let array = `["list", [${elements.join(", ")}]]`
  array = JSON.parse(array)
  return JSON.stringify([self.indent, [], "=", ref, array]) + ","
}
