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

// 權限管理 - 列表
export const getPermissions = async () => {
  return await axios({
    url: '/permissions',
    method: 'get'
  })
}

// 權限管理 - 新增
export const createPermissions = async (data) => {
  return await axios({
    url: '/permissions',
    method: 'post',
    data
  })
}

// 權限管理 - 顯示
export const getPermission = async (id) => {
  return await axios({
    url: `/permissions/${id}`,
    method: 'get'
  })
}

// 權限管理 - 編輯
export const editPermissions = async (id, data) => {
  return await axios({
    url: `/permissions/${id}`,
    method: 'post',
    data
  })
}

// 權限管理 - 刪除
export const deletePermissions = async (id) => {
  return await axios({
    url: `/permissions/${id}`,
    method: 'delete'
  })
}
