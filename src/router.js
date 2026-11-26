import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Courses from './pages/Courses.vue'
import CourseDetail from './pages/CourseDetail.vue'
import Admissions from './pages/Admissions.vue'
import Life from './pages/Life.vue'
import News from './pages/News.vue'
import NewsDetail from './pages/NewsDetail.vue'
import Contact from './pages/Contact.vue'
import Privacy from './pages/Privacy.vue'
import NotFound from './pages/NotFound.vue'

export function createSiteRouter(server = false) {
  return createRouter({
    history: server ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/', component: Home, meta: { title: '大阪で、日本語の新しい一歩を。' } },
      { path: '/about/', component: About, meta: { title: '学校案内' } },
      { path: '/courses/', component: Courses, meta: { title: '学習コース' } },
      { path: '/courses/:slug/', component: CourseDetail, meta: { title: 'コース詳細' } },
      { path: '/admissions/', component: Admissions, meta: { title: '入学案内' } },
      { path: '/life/', redirect: '/life/art/' },
      { path: '/life/art/', component: Life, meta: { title: 'アート・文化体験｜学校生活', lifeCategory: 'art' } },
      { path: '/life/atmosphere/', component: Life, meta: { title: '校内の雰囲気｜学校生活', lifeCategory: 'atmosphere' } },
      { path: '/life/activities/', component: Life, meta: { title: '交流活動｜学校生活', lifeCategory: 'activities' } },
      { path: '/news/', component: News, meta: { title: 'お知らせ' } },
      { path: '/news/:slug/', component: NewsDetail, meta: { title: 'お知らせ詳細' } },
      { path: '/contact/', component: Contact, meta: { title: 'お問い合わせ' } },
      { path: '/privacy/', component: Privacy, meta: { title: '個人情報の取り扱い' } },
      { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'ページが見つかりません' } },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.path.startsWith('/life/') && from.path.startsWith('/life/')) return false
      if (to.hash) return { el: to.hash, top: 100 }
      return { top: 0 }
    },
  })
}
