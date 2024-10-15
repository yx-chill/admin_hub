import axios from "./request"

// 取cookie
export const sanctumCsrfCookie = () => {
  return axios({
    url: '/sanctum/csrf-cookie',
    method: 'get',
    config: {
      baseURL: '/base'
    }
  })
}
