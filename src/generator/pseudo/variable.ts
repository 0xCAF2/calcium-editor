import { calciumGenerator } from "../calcium"

calciumGenerator.forBlock["pseudo_variable"] = (block) => {
  return [JSON.stringify(["var", block.getField("NAME")?.getText() ?? "i"]), 0]
}
