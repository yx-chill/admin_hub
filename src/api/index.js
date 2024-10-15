import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

// axios 實例
const instance = axios.create({
  baseURL: '/api',
  withCredentials: true, // 跨域請求時發送cookie
  withXSRFToken: true,
  timeout: 10000,
  headers: {
    'accept': 'application/json;charset=UTF-8;',
  },
  validateStatus: () => true
})

// 攔截器
// instance.interceptors.response.use((response) => {
//   // 請求成功
//   return response;
// }, async (error) => {
//   // 請求失敗
//   if (error.response && error.response.status) {
//     const status = error.response.status;
//     switch (status) {
//       case 400:
//         showMsg.error(error.response?.data?.message || '請求錯誤')
//         break;
//       case 401: {
//         const authStore = useAuthStore()
//         const router = useRouter()
//         await authStore.logout()

//         router.push({ name: 'Login' })
//         break;
//       }
//       case 404:
//         console.log('請求網址錯誤');
//         break;
//       case 408:
//         console.log('請求超時');
//         break;
//       case 500:
//         console.log('伺服器內部錯誤');
//         break;
//       case 501:
//         console.log('伺服器內部錯誤');
//         break;
//       case 502:
//         console.log('網路錯誤');
//         break;
//       case 503:
//         console.log('服務未啟用');
//         break;
//       case 504:
//         console.log('網路超時');
//         break;
//       case 505:
//         console.log('HTTP版本不支援');
//         break;
//     }
//     return Promise.reject(error);
//   }
// })

export default instance
