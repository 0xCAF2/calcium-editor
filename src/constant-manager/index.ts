class ConstantManager {
  private values!: ConstantValues
  addValues(values: ConstantValues) {
    this.values = { ...this.values, ...values }
  }
  getValue(key: string): string {
    return this.values[key] ?? ''
  }
}

export const messageManager = new ConstantManager()
export const tooltipManager = new ConstantManager()

export type ConstantValues = {
  [key: string]: string
}
