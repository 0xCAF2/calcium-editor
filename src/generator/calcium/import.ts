import { calciumGenerator } from "."

const self = calciumGenerator

calciumGenerator.forBlock["calcium_import"] = (block) => {
  const moduleName = block.getField('NAME')?.getText()
  return JSON.stringify([self.indent, [], 'import', moduleName]) + ','
}