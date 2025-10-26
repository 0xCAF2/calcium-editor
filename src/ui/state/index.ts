import { EditorState, mainState } from "./editor-state"

class EditorStateStore {
  current: EditorState

  constructor() {
    this.current = mainState
  }
}

export const editorState = new EditorStateStore()
