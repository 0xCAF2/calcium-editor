import "calciumed/src/lang/ja-jp"
import * as caed from "calciumed/src/editor"

caed.buildEditor({
  parent: document.querySelector("#app")!,
  options: { renderer: "calcium_renderer" },
  height: "calc(100% - 0px)",
})
