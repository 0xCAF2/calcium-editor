import { calciumGenerator, trimParens } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_while"] = (block) => {
  let condition = self.valueToCode(block, "CONDITION", 0) || "false"
  condition = JSON.parse(trimParens(condition))

  self.shiftIndent(1)
  const stmts =
    self.statementToCode(block, "DO") ||
    JSON.stringify([self.indent, [], "pass"]) + ","
  self.shiftIndent(-1)

  return (
    JSON.stringify([self.indent, [], "while", condition]) +
    "," +
    stmts
  )
}
