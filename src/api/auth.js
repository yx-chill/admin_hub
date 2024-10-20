import axios from "./request"
import { sanctumCsrfCookie } from './api'

// 登入
export const login = async (data) => {
  await sanctumCsrfCookie()

  return await axios({
    url: '/login',
    method: 'post',
    data
  })
}

// 登出
export const logout = async () => {
  return await axios({
    url: '/logout',
    method: 'get'
  })
}

// 帳號資訊
export const getUser = async () => {
  return await axios({
    url: '/user',
    method: 'get'
  })
}

// 註冊
export const register = async (data) => {
  await sanctumCsrfCookie()

  return await axios({
    url: '/register',
    method: 'post',
    data
  })
}

// 忘記密碼
export const forgotPassword = async (data) => {
  await sanctumCsrfCookie()

  return await axios({
    url: '/forgot-password',
    method: 'post',
    data
  })
}

// 重設密碼
export const resetPassword = async (data) => {
  return await axios({
    url: '/reset-password',
    method: 'post',
    data
  })
}

// 修改個人資訊
export const changeProfile = async (data, config) => {
  return await axios({
    url: '/profile',
    method: 'post',
    data,
    config
  })
}
