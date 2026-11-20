import { createSSRApp } from 'vue'
import App from './App.vue'
import { createSiteRouter } from './router.js'
import './style.css'

const router = createSiteRouter()
const app = createSSRApp(App)
app.use(router)
router.isReady().then(() => app.mount('#app'))
