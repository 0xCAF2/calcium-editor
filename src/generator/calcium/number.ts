import { calciumGenerator } from "."

calciumGenerator.forBlock["calcium_number"] = (block) => {
  const numStr = block.getFieldValue("NUM") || "0"
  const numExpr = JSON.stringify(["num", numStr])
  return [numExpr, 0]
}
