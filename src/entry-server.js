import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { createSiteRouter } from './router.js'

export async function render(url) {
  const router = createSiteRouter(true)
  const app = createSSRApp(App)
  app.use(router)
  await router.push(url)
  await router.isReady()
  return { html: await renderToString(app), title: router.currentRoute.value.meta.title }
}
