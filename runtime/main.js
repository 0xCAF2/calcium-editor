;(() => {
  const code = ```

  const RESULT_EXECUTED = 1
  const RESULT_PAUSED = 4

  importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.3/full/pyodide.js")

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
        const dict = pyodide.globals.get("dict")
        const globals = dict(Object.entries({ code: event.data.code }))
        result = await pyodide.runPythonAsync(
          "from calciumpy.runtime import Runtime; runtime = Runtime(code, decodes_str=True); result = runtime.run(); print(end='', flush=True); result.value",
          { globals }
        )
      } else if (event.data.input) {
        result = await pyodide.runPythonAsync(
          "result = runtime.resume(input_data); result.value",
          { input_data: event.data.input }
        )
      }
      if (result === RESULT_PAUSED) {
        postMessage({ input: pyodide.runPython("runtime.env.prompt") })
      } else if (result === RESULT_EXECUTED) {
        result = await pyodide.runPythonAsync(
          "result = runtime.run(); result.value"
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
      const lineNumber = pyodide.runPython("runtime.env.addr.line") - 1
      postMessage({ error: e, line: lineNumber })
    }
  }
  ```

  function initialize() {
    let worker = new Worker(
      URL.createObjectURL(new Blob([code], { type: "application/javascript" }))
    )
    window.worker = worker
  }

  function reset() {
    if (window.worker) {
      window.worker.terminate()
      window.worker = null
      initialize()
    }
  }
  window.cancel = reset

  initialize()
})()
