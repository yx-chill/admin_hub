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

// 權限管理 - 排序
export const sortPermissions = async (data) => {
  return await axios({
    url: '/permissions/sort',
    method: 'put',
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

// 角色管理 - 列表
export const getRoles = async () => {
  return await axios({
    url: '/roles',
    method: 'get'
  })
}

// 角色管理 - create權限表
export const getRolesCreate = async () => {
  return await axios({
    url: '/roles/create',
    method: 'get'
  })
}

// 角色管理 - 新增
export const createRoles = async (data) => {
  return await axios({
    url: '/roles',
    method: 'post',
    data
  })
}

// 角色管理 - edit權限表
export const getRolesEdit = async (id) => {
  return await axios({
    url: `/roles/${id}/edit`,
    method: 'get'
  })
}

// 角色管理 - 顯示
export const getRole = async (id) => {
  return await axios({
    url: `/roles/${id}`,
    method: 'get'
  })
}

// 角色管理 - 編輯
export const editRoles = async (id, data) => {
  return await axios({
    url: `/roles/${id}`,
    method: 'put',
    data
  })
}

// 角色管理 - 排序
export const sortRoles = async (data) => {
  return await axios({
    url: '/roles/sort',
    method: 'put',
    data
  })
}

// 角色管理 - 刪除
export const deleteRoles = async (id) => {
  return await axios({
    url: `/roles/${id}`,
    method: 'delete'
  })
}

// 群組管理 - 列表
export const getGroups = async (data = {}) => {
  return await axios({
    url: '/user-groups',
    method: 'get',
    data
  })
}

// 群組管理 - create角色列表
export const getGroupCreate = async () => {
  return await axios({
    url: '/user-groups/create',
    method: 'get'
  })
}

// 群組管理 - 新增
export const createGroup = async (data) => {
  return await axios({
    url: '/user-groups',
    method: 'post',
    data
  })
}

// 群組管理 - edit角色列表
export const getGroupEdit = async (id) => {
  return await axios({
    url: `/user-groups/${id}/edit`,
    method: 'get'
  })
}

// 群組管理 - 顯示
export const getGroup = async (id) => {
  return await axios({
    url: `/user-groups/${id}`,
    method: 'get'
  })
}


// 群組管理 - 編輯
export const editGroup = async (id, data) => {
  return await axios({
    url: `/user-groups/${id}`,
    method: 'put',
    data
  })
}

// 群組管理 - 修改狀態
export const groupStatus = async (id, data) => {
  return await axios({
    url: `/user-groups/${id}/status`,
    method: 'put',
    data
  })
}


// 群組管理 - 刪除
export const deleteGroups = async (id) => {
  return await axios({
    url: `/user-groups/${id}`,
    method: 'delete'
  })
}

// 帳號管理 - 列表
export const getUsers = async (data = {}) => {
  return await axios({
    url: '/users',
    method: 'get',
    data
  })
}

// 帳號管理 - 群組列表
export const getUsersCreate = async () => {
  return await axios({
    url: '/users/create',
    method: 'get'
  })
}

// 帳號管理 - 新增
export const createUsers = async (data) => {
  return await axios({
    url: '/users',
    method: 'post',
    data
  })
}


// 帳號管理 - 群組列表
export const getUsersEdit = async (id) => {
  return await axios({
    url: `/users/${id}/edit`,
    method: 'get'
  })
}

// 帳號管理 - 顯示
export const getUser = async (id) => {
  return await axios({
    url: `/users/${id}`,
    method: 'get'
  })
}


// 帳號管理 - 編輯
export const editUser = async (id, data) => {
  return await axios({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

// 帳號管理 - 修改狀態
export const userStatus = async (id, data) => {
  return await axios({
    url: `/users/${id}/status`,
    method: 'put',
    data
  })
}

// 帳號管理 - 刪除
export const deleteUsers = async (id) => {
  return await axios({
    url: `/users/${id}`,
    method: 'delete'
  })
}
