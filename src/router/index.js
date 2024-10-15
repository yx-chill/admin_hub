import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'

// store
import { useAuthStore } from '@/stores/auth';
// layout
import LoginLayout from '@/layouts/LoginLayout.vue'
import ManagerLayout from '@/layouts/ManagerLayout.vue'
// page
import LoginView from '@/views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // -- 未登入 --
    { // 登入
      path: '/login',
      name: 'Login',
      meta: { layout: LoginLayout },
      component: LoginView
    },
    { // 重設密碼
      path: '/reset-password/:token',
      name: 'Reset',
      meta: { layout: LoginLayout },
      component: () => import('../views/ResetPasswordView.vue'),
      beforeEnter: (to) => {
        // 必須帶email若沒有帶email則導回登入頁
        const { email } = to.query

        if (!email) {
          return { name: 'Login' }
        }
      },
    },
    // -- 有登入 --
    { // 首頁
      path: '/',
      name: 'index',
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
    { // 個人資料
      path: '/profile',
      name: 'Profile',
      meta: { layout: ManagerLayout },
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/:catchAll(.*)*',
      redirect: {
        name: 'index',
      },
    }
  ]
})

// 不須登入的頁面
const pages = ['Login', 'Reset']

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const { isAuthenticated, isLoading, user } = storeToRefs(authStore)

  // 等待使用者資訊加載完成
  if (isLoading.value) {
    // 可以在這裡顯示一個加載指示器
    await until(() => !isLoading.value)
  }

  // 檢查是否已登入
  if (!isAuthenticated.value) {
    // ❗️ 避免無限重定向
    if (!pages.includes(to.name)) {
      // 未登入且在需登入的頁面則導回登入頁
      return { name: 'Login' }
    }
  } else {
    // 有登入但帳號未驗證則到驗證頁
    if (user.value?.email_verified_at) {
      // return { name: 'EmailVerified' }
    }
    // 有登入且在不需登入的頁面則導回首頁
    if (pages.includes(to.name)) {
      return { name: 'index' }
    }
  }
})

// 輔助函數
function until(condition) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval)
        resolve()
      }
    }, 100)
  })
}

export default router
