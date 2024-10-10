import { createRouter, createWebHistory } from 'vue-router'
// layout
import LoginLayout from '@/layouts/LoginLayout.vue'
import ManagerLayout from '@/layouts/ManagerLayout.vue'
// page
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: LoginLayout },
      component: LoginView
    },
    {
      path: '/',
      name: 'manager',
      meta: { layout: ManagerLayout },
      component: () => import('../views/ManagerView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: { layout: ManagerLayout },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: ManagerLayout },
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router
