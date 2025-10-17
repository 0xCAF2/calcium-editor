import { defineConfig } from "vite"

export default defineConfig({
  server: {
    host: "localhost",
    port: 50081,
    strictPort: true,
    proxy: {
      "/editor/": {
        target: "http://localhost:50081/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/editor/, ""),
      },
    },
  },
})
