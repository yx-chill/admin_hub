import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => ({
    menuState: false
  }),
  actions: {
  },
})
