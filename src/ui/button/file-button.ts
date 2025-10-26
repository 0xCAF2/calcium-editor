export function createFileButton(): HTMLElement {
  const button = document.createElement("div")
  button.id = "file-button"

  // create humberger icon with three lines
  for (let i = 0; i < 3; i++) {
    const line = document.createElement("div")
    line.className = "line"
    button.appendChild(line)
  }

  return button
}
