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
  await pyodide.loadPackage(['numpy'])
  postMessage('loaded#')
}

let pyodidePromise = loadPyodideAndPackages()

onmessage = async (event) => {
  await pyodidePromise
  const code = event.data
  pyodide.runPythonAsync(code).catch((error) => {
    postMessage(`error#${error}`)
  })
}
