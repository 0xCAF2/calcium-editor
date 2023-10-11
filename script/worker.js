const RESULT_EXECUTED = 1
const RESULT_PAUSED = 4

importScripts('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js')

let pyodide

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    stdout: (output) => {
      postMessage({ output })
    },
  })
  await pyodide.loadPackage(['micropip', 'numpy', 'pandas', 'scipy'])
  pyodide.runPythonAsync(`import micropip
await micropip.install('calciumlang')
from calciumlang.runtime import Runtime
`)
  postMessage({ loaded: true })
}

let pyodidePromise = loadPyodideAndPackages()

onmessage = async (event) => {
  await pyodidePromise
  let result
  try {
    if (event.data.code) {
      result = await pyodide.runPythonAsync(event.data.code)
    } else if (event.data.input) {
      result = await pyodide.runPythonAsync(
        `result = runtime.resume('${event.data.input}')
result.value`
      )
    }
    if (result === RESULT_PAUSED) {
      postMessage({ input: pyodide.runPython('runtime.env.prompt') })
    } else if (result === RESULT_EXECUTED) {
      result = await pyodide.runPythonAsync(
        `result = runtime.run()
result.value`
      )
      if (result === RESULT_PAUSED) {
        postMessage({ input: pyodide.runPython('runtime.env.prompt') })
      }
    }
  } catch (e) {
    postMessage({ error: e })
  }
}
