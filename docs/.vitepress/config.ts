import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Caed | Programming",
  description: "A visual programming editor to learn Python on the browser",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [{ icon: "github", link: "https://github.com/0xCAF2/caed" }],
  },
  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    ja: {
      label: "日本語",
      lang: "ja",
      title: "カルシウム | プログラミング",
      description:
        "「情報I」擬似言語を学ぶためのブロックエディタです。Python 風のコードを実行できます。",
    },
  },
  base: "/",
})
