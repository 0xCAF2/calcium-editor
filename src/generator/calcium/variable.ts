import { calciumGenerator } from "."

calciumGenerator.forBlock["calcium_variable"] = (block) => {
  return [JSON.stringify(["var", block.getField("NAME")?.getText() ?? "i"]), 0]
}
