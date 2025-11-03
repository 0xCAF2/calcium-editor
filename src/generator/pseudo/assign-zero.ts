import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_assign_zero"] = (block) => {
  let ref = self.valueToCode(block, "REF", 0) || '["var", "Data"]'
  ref = JSON.parse(trimParens(ref))

  const forRange = [
    self.indent,
    [],
    "for",
    ["var", "i"],
    ["call", ["var", "range"], [["call", ["var", "len"], [ref]]]],
  ]
  const assign = [
    self.indent + 1,
    [],
    "=",
    ["sub", ref, ["var", "i"]],
    ["num", "0"],
  ]
  return `${JSON.stringify(forRange)},${JSON.stringify(assign)},`
}
