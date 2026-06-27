import { readFileSync, writeFileSync } from "fs"

const workerCode = readFileSync("./dev/worker.js", "utf-8")
const editorStateCode = readFileSync("./src/worker/create-worker.ts", "utf-8")

const indexOfWorkerCode = editorStateCode.indexOf("const workerCode = `")

writeFileSync(
  "./src/worker/create-worker.ts",
  editorStateCode.slice(0, indexOfWorkerCode) +
    `const workerCode = \`${workerCode.replace('"\\n"', '"\\\\n"')}\`\n`,
  "utf-8",
)
