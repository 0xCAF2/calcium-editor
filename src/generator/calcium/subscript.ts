import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_subscript"] = (block) => {
  let ref = self.valueToCode(block, "REF", 0) || `["var", "s"]`
  ref = JSON.parse(trimParens(ref))

  let subCode = self.valueToCode(block, "SUB", 0) || '["num", "0"]'
  let sub = JSON.parse(trimParens(subCode))
  if (sub instanceof Array && sub[0] === "slice") {
    const start = sub[1]
    const end = sub[2]
    const code = JSON.stringify(["sub", ref, start, end])
    return [code, 0]
  } else {
    const code = JSON.stringify(["sub", ref, sub])
    return [code, 0]
  }
}
