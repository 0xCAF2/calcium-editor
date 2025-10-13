import "calciumed/src/lang/ja-jp"
import { buildEditor } from "calciumed/src/editor"
import { initializeEditor } from "./interop"

initializeEditor(
  await buildEditor({
    parent: document.querySelector("#app")!,
    options: { renderer: "calcium_renderer" },
    height: "calc(100% - 0px)",
  })
)
