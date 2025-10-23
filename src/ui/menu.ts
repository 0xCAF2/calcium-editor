import type { L10N } from "../l10n"
import { html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"

const menu = document.querySelector("#menu") as HTMLElement

export function createMenu(l10n: L10N) {
  const menuBar = new MenuBar(l10n)
  menu.appendChild(menuBar)
}

@customElement("menu-bar")
class MenuBar extends LitElement {
  constructor(private l10n: L10N) {
    super()
  }

  render() {
    return html`
      <div id="menu">
        <button id="run-button">${this.l10n.run}</button>
        <button id="stop-button">${this.l10n.stop}</button>
      </div>
    `
  }
}
