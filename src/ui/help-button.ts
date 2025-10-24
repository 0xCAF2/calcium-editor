export function createHelpButton(): HTMLElement {
  const button = document.createElement("div")
  button.id = "help-button"
  button.textContent = "？"
  return button
}
