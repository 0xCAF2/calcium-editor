import { serve } from "bun"
import index from "../public/index.html"
import indexEn from "../public/en/index.html"
import indexJa from "../public/ja/index.html"

const server = serve({
  routes: {
    "/": index,
    "/en/": indexEn,
    "/ja/": indexJa,
  },
  development: {
    hmr: true,
  },
})

console.log(server.url.href)
