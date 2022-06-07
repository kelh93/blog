import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/Volumes/DeskTop/Documents/github/kelh93/My-Blog/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("/Volumes/DeskTop/Documents/github/kelh93/My-Blog/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
