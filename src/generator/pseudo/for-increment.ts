import { calciumGenerator, trimParens } from "../calcium"

const self = calciumGenerator

calciumGenerator.forBlock["pseudo_for_increment"] = (block) => {
  let variable = self.valueToCode(block, "VAR", 0) || '["var", "i"]'
  variable = JSON.parse(variable)

  let startStr = self.valueToCode(block, "START", 0)
  let start: any[]
  if (!startStr) {
    start = ["num", "0"]
  } else {
    start = JSON.parse(trimParens(startStr))
  }

  let stopStr = self.valueToCode(block, "STOP", 0) || '["num", "9"]'
  let stop = JSON.parse(trimParens(stopStr))
  stop = ["+", stop, ["num", "1"]]

  let stepStr = self.valueToCode(block, "STEP", 0) || '["num", "1"]'
  let step: any[]
  step = JSON.parse(trimParens(stepStr))

  self.shiftIndent(1)
  const stmts =
    self.statementToCode(block, "STMTS") ||
    JSON.stringify([self.indent, [], "pass"]) + ","
  self.shiftIndent(-1)
  const range = [start, stop, step]
  return (
    JSON.stringify([
      self.indent,
      [],
      "for",
      variable,
      ["call", ["var", "range"], range],
    ]) +
    "," +
    stmts
  )
}
