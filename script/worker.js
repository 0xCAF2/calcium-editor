const RESULT_EXECUTED = 1
const RESULT_PAUSED = 4

importScripts('https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js')

let pyodide

let isFirstOutput = true

async function loadPyodideAndPackages() {
  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/',
    stdout: (output) => {
      if (isFirstOutput) {
        isFirstOutput = false
        return ''
      } else {
        postMessage(`output#${output}`)
      }
    },
  })
  pyodide.runPython(await (await fetch('/script/calciumlang.py')).text())
  await pyodide.loadPackage(['numpy', 'scipy', 'scikit-learn'])
  postMessage('loaded#')
}

let pyodidePromise = loadPyodideAndPackages()

onmessage = async (event) => {
  await pyodidePromise
  let result
  try {
    if (event.data.startsWith('code#')) {
      const code = event.data.substring(5)
      result = await pyodide.runPythonAsync(code)
    } else if (event.data.startsWith('input#')) {
      result = await pyodide.runPythonAsync(
        `result = runtime.resume('${event.data.substring(6)}')
result`
      )
    }
    if (result === RESULT_PAUSED) {
      postMessage(`input#${pyodide.runPython('runtime.env.prompt')}`)
    } else if (result === RESULT_EXECUTED) {
      result = await pyodide.runPythonAsync(
        `result = runtime.run()
result`
      )
      if (result === RESULT_PAUSED) {
        postMessage(`input#${pyodide.runPython('runtime.env.prompt')}`)
      }
    }
  } catch (e) {
    postMessage(`error#${e}`)
  }
}
