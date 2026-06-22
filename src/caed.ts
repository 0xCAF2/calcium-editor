export abstract class Caed {
  public options = new CaedOptions()

  build() {
    throw new Error("Method not implemented.")
  }

  set height(value: string | number) {
    if (typeof value === "number") {
      this.options.height = `${value}px`
    } else {
      this.options.height = value
    }
  }
}

export class CaedOptions {
  public height?: string
}
