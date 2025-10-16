import { defineConfig } from "vite"

export default defineConfig({
  server: {
    port: 50082,
    strictPort: true,
    proxy: {
      "/runtime/": {
        target: "http://localhost:50082/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/runtime/, ""),
      },
    },
  },
})
