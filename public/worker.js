const RESULT_EXECUTED = 1
const RESULT_PAUSED = 4

importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.3/full/pyodide.js")

let pyodide

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    stdout: (output) => {
      postMessage({ output })
      console.log(output)
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
      const dict = pyodide.globals.get("dict")
      const globals = dict(Object.entries({ code: event.data.code }))
      result = await pyodide.runPythonAsync(
        `from calciumpy.runtime import Runtime; runtime = Runtime(code, decodes_str=True); result = runtime.run(); print(end='', flush=True); result.value`,
        { globals }
      )
    } else if (event.data.input) {
      result = await pyodide.runPythonAsync(
        `result = runtime.resume(input_data); result.value`,
        { input_data: event.data.input }
      )
    } /* else if (event.data.stop) {
      let interruptBuffer = new Uint8Array(new SharedArrayBuffer(1))
      interruptBuffer[0] = 2
      pyodide.setInterruptBuffer(interruptBuffer)
      return
    } */
    if (result === RESULT_PAUSED) {
      postMessage({ input: pyodide.runPython("runtime.env.prompt") })
    } else if (result === RESULT_EXECUTED) {
      result = await pyodide.runPythonAsync(
        `result = runtime.run(); result.value`
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
    const error = e.toString().split("\n")
    postMessage({ error: error.slice(-2, -1) })
  }
}
