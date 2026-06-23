import { serve } from "bun"
import index from "../public/index.html"
import indexJa from "../public/index-ja.html"

const server = serve({
  routes: {
    "/en/": index,
    "/": indexJa,
  },
  development: {
    hmr: true,
  },
})

console.log(server.url.href)
