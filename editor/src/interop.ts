import type { CalciumEditor } from "calciumed/src/editor"

let editor: CalciumEditor | null = null

export function initializeEditor(caed: CalciumEditor) {
  editor = caed
}

// @ts-ignore
window.generateCode = function () {
  if (!editor) return
  return editor.code
}
