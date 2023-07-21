const RESULT_EXECUTED = 1
const RESULT_PAUSED = 4

importScripts('https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js')

let pyodide

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
    stdout: (output) => {
      postMessage({ output })
    },
  })
  pyodide.runPython(await (await fetch('/script/calciumlang.py')).text())
  // await pyodide.loadPackage(['numpy', 'pandas', 'scipy'])
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
result`
      )
    }
    if (result === RESULT_PAUSED) {
      postMessage({ input: pyodide.runPython('runtime.env.prompt') })
    } else if (result === RESULT_EXECUTED) {
      result = await pyodide.runPythonAsync(
        `result = runtime.run()
result`
      )
      if (result === RESULT_PAUSED) {
        postMessage({ input: pyodide.runPython('runtime.env.prompt') })
      }
    }
  } catch (e) {
    postMessage({ error: e })
  }
}
