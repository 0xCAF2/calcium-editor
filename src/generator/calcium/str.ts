import { calciumGenerator } from "."

calciumGenerator.forBlock["calcium_str"] = (block) => {
  const str = block.getField("STR")?.getText() || ""
  return [`${JSON.stringify(str)}`, 0]
}
