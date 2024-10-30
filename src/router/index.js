import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'

// store
import { useAuthStore } from '@/stores/auth'
import { useStateStore } from '@/stores/state'
// layout
import LoginLayout from '@/layouts/LoginLayout.vue'
import ManagerLayout from '@/layouts/ManagerLayout.vue'
// page
import LoginView from '@/views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      children: [
        // -- 未登入 --
        { // 登入
          path: 'login',
          name: 'Login',
          meta: {
            layout: LoginLayout,
            requireAuth: false
          },
          component: LoginView
        },
        { // 重設密碼
          path: 'reset-password/:token',
          name: 'Reset',
          meta: {
            layout: LoginLayout,
            requireAuth: false
          },
          component: () => import('@/views/ResetPasswordView.vue'),
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
          path: '',
          name: 'index',
          meta: {
            layout: ManagerLayout,
            requireAuth: true
          },
          component: () => import('@/views/ManagerView.vue')
        },
        { // 信箱驗證
          path: 'email/verify',
          name: 'EmailVerify',
          meta: {
            layout: ManagerLayout,
            requireAuth: true
          },
          component: () => import('@/views/EmailVerifyView.vue'),
          beforeEnter: () => {
            const authStore = useAuthStore()
            const { user } = storeToRefs(authStore)

            if (user.value?.email_verified_at) {
              return { name: 'index' }
            }
          },
        },
        { // 權限管理
          path: 'permission',
          children: [
            { // 列表
              path: '',
              name: 'Permission',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/permission/PermissionView.vue')
            },
            { // 新增
              path: 'create',
              name: 'PermissionCreate',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/permission/PermissionCreateView.vue')
            },
            { // 編輯
              path: 'edit/:id',
              name: 'PermissionEdit',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/permission/PermissionEditView.vue')
            }
          ]
        },
        { // 角色管理
          path: 'role',
          children: [
            { // 列表
              path: '',
              name: 'Role',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/role/RoleView.vue')
            },
            { // 新增
              path: 'create',
              name: 'RoleCreate',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/role/RoleCreateView.vue')
            },
            { // 編輯
              path: 'edit/:id',
              name: 'RoleEdit',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/role/RoleEditView.vue')
            }
          ]
        },
        { // 群組管理
          path: 'group',
          children: [
            { // 列表
              path: '',
              name: 'Group',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/group/GroupView.vue')
            },
            { // 新增
              path: 'create',
              name: 'GroupCreate',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/group/GroupCreateView.vue')
            },
            { // 編輯
              path: 'edit/:id',
              name: 'GroupEdit',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/group/GroupEditView.vue')
            }
          ]
        },
        { // 帳號管理
          path: 'users',
          children: [
            {
              path: '',
              name: 'Users',
              meta: {
                layout: ManagerLayout,
                requireAuth: true
              },
              component: () => import('@/views/manage/users/UsersView.vue')
            },
            // {
            //   path: ':id',
            //   name: 'UserSettings',
            //   meta: {
            //     layout: ManagerLayout,
            //     requireAuth: true
            //   },
            //   component: () => import('@/views/UserSettingsView.vue')
            // }
          ]
        },
        { // 個人資料
          path: 'profile',
          name: 'Profile',
          meta: {
            layout: ManagerLayout,
            requireAuth: true
          },
          component: () => import('@/views/settings/ProfileView.vue')
        },
        { // 有緣人電台
          path: 'radio',
          name: 'Radio',
          meta: {
            layout: ManagerLayout,
            requireAuth: true
          },
          component: () => import('@/views/RadioView.vue')
        },
        { // catchAll
          path: '/:catchAll(.*)',
          redirect: {
            name: 'index',
          },
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const stateStore = useStateStore()
  const { isAuthenticated, isLoading, user } = storeToRefs(authStore)
  const { menuState } = storeToRefs(stateStore)

  // 等待使用者資訊加載完成
  if (isLoading.value) {
    // 可以在這裡顯示一個加載指示器
    await until(() => !isLoading.value)
  }

  menuState.value = false

  // 檢查是否已登入
  if (!isAuthenticated.value) {
    // ❗️ 避免無限重定向
    if (to.meta.requireAuth) {
      // 未登入且在需登入的頁面則導回登入頁
      return { name: 'Login' }
    }
  } else {
    // 有登入但帳號未驗證則到驗證頁
    if (!user.value?.email_verified_at && to.name !== 'EmailVerify') {
      return { name: 'EmailVerify' }
    }
    // 有登入且在不需登入的頁面則導回首頁
    if (!to.meta.requireAuth) {
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
