import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router'
import menus from './menus'
import { activeMenuPath } from '@/hooks/menus'
import { EEnv } from '@/constant/env'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'main',
    redirect: '/',
    component: () => import('../views/main/main-index.vue'),
    children: menus
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    // name: '404',
    // component: () => import('../views/error/not-found.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.path != activeMenuPath.value) {
    window.scrollTo(0, 0);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const moduleContainer = document.querySelector('.module-container');
    if (moduleContainer) {
      moduleContainer.scrollTo({
        top: 0,
        // behavior: 'smooth',
      });
    }
  }
  activeMenuPath.value = to.path
  next()
})

export default router
