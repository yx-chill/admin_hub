import { defineStore } from 'pinia'
import { createMongoAbility as createAbility } from '@casl/ability'
import { defineAbilitiesFor } from '@/casl/ability'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    ability: createAbility([]),
    isLoading: true,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user?.id
  },
  actions: {
    setUser(user) {
      this.user = user
      this.ability = defineAbilitiesFor(user.permissions || {})
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
