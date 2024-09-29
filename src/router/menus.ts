export default [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/home/home-index.vue')
  },
  {
    path: '/auth',
    name: 'indexAuth',
    component: () => import('../views/home/home-index.vue')
  }
]
