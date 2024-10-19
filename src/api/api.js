import axios from "./request"

// 取cookie
export const sanctumCsrfCookie = async () => {
  return await axios({
    url: '/sanctum/csrf-cookie',
    method: 'get',
    config: {
      baseURL: import.meta.env.VITE_DOMAIN
    }
  })
}

// 重寄驗證信
export const reSend = async () => {
  return await axios({
    url: '/email/verification-notification',
    method: 'post'
  })
}