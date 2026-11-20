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
      { path: '/life/', component: Life, meta: { title: '学校生活' } },
      { path: '/news/', component: News, meta: { title: 'お知らせ' } },
      { path: '/news/:slug/', component: NewsDetail, meta: { title: 'お知らせ詳細' } },
      { path: '/contact/', component: Contact, meta: { title: 'お問い合わせ' } },
      { path: '/privacy/', component: Privacy, meta: { title: '個人情報の取り扱い' } },
      { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'ページが見つかりません' } },
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, top: 100 }
      return { top: 0 }
    },
  })
}
