import { calciumGenerator } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_break_continue"] = (block) => {
  return JSON.stringify([self.indent, [], block.getFieldValue("FLOW")]) + ","
}
