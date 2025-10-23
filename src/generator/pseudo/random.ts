import { calciumGenerator } from "../calcium"

calciumGenerator.forBlock["pseudo_random"] = () => {
  const code = ["call", ["attr", ["var", "random"], "random"], []]
  return [JSON.stringify(code), 0]
}
