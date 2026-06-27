import { buildEditor, CalciumEditor, InjectOptions } from "../editor"
import { createMenu } from "../ui/menu"
import { editorState } from "../ui/state/editor-state"

export class Caed {
  public parameters = new CaedParams()
  public errorMessages: CaedErrorMessages = new CaedErrorMessages()

  private _editor?: CalciumEditor

  get editor(): CalciumEditor | undefined {
    return this._editor
  }

  private buildEditor(): void {
    if (!this.parameters.parent) {
      throw new Error(this.errorMessages.invalidParent)
    }
    if (!this._editor) {
      this._editor = buildEditor({
        parent: this.parameters.parent,
        options: this.parameters.options,
        height: this.parameters.height,
      })
    }
  }

  set parent(value: HTMLElement) {
    this.parameters.parent = value
  }

  set options(value: InjectOptions) {
    this.parameters.options = value
  }

  set height(value: string | number) {
    if (typeof value === "number") {
      this.parameters.height = `${value}px`
    } else {
      this.parameters.height = value
    }
  }
  // This getter includes a call to buildEditor() as a side effect to localize
  // the build process.
  get build(): null {
    if (this.parameters.parent && !this._editor) {
      this.buildEditor()
      editorState.editor = this._editor!
      createMenu(editorState.l10n)
    }
    return null
  }
}

export class CaedParams {
  public parent?: HTMLElement
  public options?: InjectOptions
  public height?: string
}

export class CaedErrorMessages {
  get invalidParent() {
    return "Invalid parent element. Please provide a valid HTMLElement."
  }
}
