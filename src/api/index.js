import axios from 'axios'
import { useRouter } from 'vue-router'
import { createDiscreteApi } from 'naive-ui'
import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const { message: showMsg } = createDiscreteApi(['message'], {
  messageProviderProps: { placement: 'bottom-right', duration: 5000 }
})

const createAxiosInstance = () => {
  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true

  // axios 實例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'accept': 'application/json;charset=UTF-8;',
    },
    withCredentials: true, // 跨域請求時發送cookie
    withXSRFToken: true,
    validateStatus: () => true
  })

  // 攔截器

  // instance.interceptors.request.use(
  //   (config) => {
  //     // 在發送請求之前做些什麼
  //     // 例如：添加 token
  //     // const token = localStorage.getItem('token')
  //     // if (token) {
  //     //   config.headers.Authorization = `Bearer ${token}`
  //     // }
  //     return config
  //   },
  //   (error) => {
  //     // 對請求錯誤做些什麼
  //     return Promise.reject(error)
  //   }
  // )

  instance.interceptors.response.use((response) => {
    // 請求成功 (2xx)
    return response.data
  }, async (error) => {
    // 請求失敗
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 401:
        case 419:
          await handleLogout()
          break
        case 400:
        case 403:
        case 429:
        case 500:
          showMsg.error(error.response?.data?.message || '請求錯誤')
          break
        default:
          showMsg.error('發生未知錯誤')
      }
    } else if (error.request) {
      showMsg.error('無法連線到伺服器')
    } else {
      showMsg.error('發生錯誤，請稍後再試')
    }
    return Promise.reject(error);
  })

  return instance
}

async function handleLogout() {
  const router = useRouter()
  const authStore = useAuthStore()

  try {
    await logout()
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    authStore.clearUser()
    await router.push({ name: 'Login' })
  }
}

export default createAxiosInstance()
