import { createApp } from 'vue'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .mount('#app')
