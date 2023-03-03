import { createRouter, createWebHistory } from 'vue-router'
// import Main from '../../components/pages/Main.vue'
import Main from '@/components/pages/Main.vue'
import PostPage from '@/components/pages/PostPage.vue'
import About from '@/components/pages/About.vue'

/* массив с маршрутами */
const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostPage,
  },
  {
    path: '/about',
    component: About,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
})

export default router
