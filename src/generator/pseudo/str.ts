import { calciumGenerator } from "../calcium"

calciumGenerator.forBlock["pseudo_str"] = (block) => {
  const str = block.getField("STR")?.getText() || ''
  return [`${JSON.stringify(str)}`, 0]
}
