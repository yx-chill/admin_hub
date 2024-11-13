import axios from 'axios'
import { logout } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { errorMsg } from '@/composables/useMessage'
import router from '@/router/index'
import { storeToRefs } from 'pinia'

let isLoggingOut = false

const handleLogout = async () => {
  if (isLoggingOut) return

  isLoggingOut = true
  const authStore = useAuthStore()

  try {
    await logout()
  } finally {
    isLoggingOut = false
    authStore.clearUser()
    await router.push({ name: 'Login' })
  }
}


const createAxiosInstance = () => {
  axios.defaults.withCredentials = true
  axios.defaults.withXSRFToken = true

  // axios 實例
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
      'accept': 'application/json;charset=UTF-8;',
    },
    withCredentials: true, // 跨域請求時發送cookie
    withXSRFToken: true,
    // validateStatus: () => true
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

      switch (error.response.status) {
        case 401:
        case 419: {
          const authStore = useAuthStore()
          const { isAuthenticated } = storeToRefs(authStore)

          if (isAuthenticated.value) {
            await handleLogout()
          }
          break
        }
        case 400:
        case 403:
        case 429:
        case 500:
          errorMsg(error.response?.data?.message || '請求錯誤')
          break
        default:
          errorMsg(error.response?.data?.message || '發生未知錯誤')
      }
    } else if (error.request) {
      errorMsg('無法連線到伺服器')
    } else {
      errorMsg('發生錯誤，請稍後再試')
    }
    return Promise.reject(error)
  })

  return instance
}

export default createAxiosInstance()
