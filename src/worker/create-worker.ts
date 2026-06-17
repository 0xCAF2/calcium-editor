import {
  appendRuntimeOutput,
  appendRuntimeError,
  enableRuntimeInput,
} from "../ui/dialog/runtime-dialog"
import * as runButton from "../ui/state/run-button-state"

export function createWorker(): Worker {
  const blob = new Blob([workerCode], { type: "text/javascript" })
  const workerUrl = URL.createObjectURL(blob)
  const worker = new Worker(workerUrl)
  worker.onmessage = (event) => {
    const message = event.data
    if (message.loaded) {
      runButton.buttonState.current = runButton.enabledState
    } else if (message.output || message.output === "") {
      appendRuntimeOutput(message.output)
    } else if (message.error) {
      appendRuntimeError(message.error.join("\n"))
    } else if (message.input || message.input === "") {
      enableRuntimeInput(message.input)
    }
  }
  return worker
}

const workerCode = `const RESULT_EXECUTED = 1
const RESULT_PAUSED = 4

importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.js")

let pyodide

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    stdout: (output) => {
      postMessage({ output })
    },
  })
  await pyodide.loadPackage("micropip")
  let micropip = pyodide.pyimport("micropip")
  await micropip.install("calciumpy")
  postMessage({ loaded: true })
}

let pyodidePromise = loadPyodideAndPackages()

onmessage = async (event) => {
  await pyodidePromise
  let result
  try {
    if (event.data.code) {
      pyodide.globals.set("code", event.data.code)
      result = await pyodide.runPythonAsync(
        "from calciumpy.runtime import Runtime; runtime = Runtime(code, decodes_str=True); result = runtime.run(); print(end='', flush=True); result.value",
      )
    } else if (event.data.input) {
      pyodide.globals.set("input_data", event.data.input)
      result = await pyodide.runPythonAsync(
        "result = runtime.resume(input_data); result.value",
      )
    }

    if (result === RESULT_PAUSED) {
      postMessage({ input: pyodide.runPython("runtime.env.prompt") })
    } else if (result === RESULT_EXECUTED) {
      result = await pyodide.runPythonAsync(
        "result = runtime.run(); result.value",
      )
      if (result === RESULT_PAUSED) {
        postMessage({ input: pyodide.runPython("runtime.env.prompt") })
      }
    }
  } catch (e) {
    console.error(e)
    // locate the error in the original code
    // Neither "#" nor "import" commands count as lines
    // since they are not part of the user code
    // const lineNumber = pyodide.runPython("runtime.env.addr.line") - 1
    const error = e.toString().split("\\n")
    postMessage({ error: error.slice(-2, -1) })
  }
}
`
