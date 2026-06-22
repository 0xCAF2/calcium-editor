import { serve } from "bun"
import index from "../public/index-ja.html"

const server = serve({
  routes: {
    "/ja/": index,
  },
  development: {
    hmr: true,
  },
})

console.log(server.url.href)
