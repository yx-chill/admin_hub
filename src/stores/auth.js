import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: true
  }),
  getters: {
    isAuthenticated: (state) => !!state.user?.id
  },
  actions: {
    setUser(user) {
      this.user = user
      this.isLoading = false
    },
    clearUser() {
      this.user = null
      this.isLoading = false
    },
    setLoading(loading) {
      this.isLoading = loading
    }
  },
})
