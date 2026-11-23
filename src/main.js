import { createSSRApp } from 'vue'
import App from './App.vue'
import { createSiteRouter } from './router.js'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/collapse/style/css'
import 'element-plus/es/components/collapse-item/style/css'
import './style.css'
import './ui-refresh.css'

const router = createSiteRouter()
const app = createSSRApp(App)
app.use(router)
router.isReady().then(() => app.mount('#app'))
