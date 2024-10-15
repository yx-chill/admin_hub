import axios from "./request"
import { sanctumCsrfCookie } from './api'

export const login = async (data) => {
  await sanctumCsrfCookie()

  return await axios({
    url: '/login',
    method: 'post',
    data
  })
}

export const logout = async () => {
  return await axios({
    url: '/logout',
    method: 'get'
  })
}

export const getUser = async () => {
  return await axios({
    url: '/user',
    method: 'get'
  })
}
