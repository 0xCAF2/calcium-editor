import { buildEditor, InjectOptions } from "../editor"

export class Caed {
  public parameters = new CaedParams()
  public errorMessages: CaedErrorMessages = new CaedErrorMessages()

  buildEditor() {
    if (!this.parameters.parent) {
      throw new Error(this.errorMessages.invalidParent)
    }
    return buildEditor({
      parent: this.parameters.parent,
      options: this.parameters.options,
      height: this.parameters.height,
    })
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
