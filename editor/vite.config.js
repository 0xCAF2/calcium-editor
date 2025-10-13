import { defineConfig } from "vite"

export default defineConfig({
  server: {
    proxy: {
      "/blockly/": {
        target: "http://localhost:5173/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blockly/, ""),
      },
    },
  },
})
