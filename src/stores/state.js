import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => ({
    menuState: false,
    showAvatarCropper: false,
    emailList: [
      '@gmail.com',
      '@yahoo.com.tw',
      '@hotmail.com',
      '@outlook.com',
      '@msn.com',
      '@pchome.com.tw'
    ]
  }),
  actions: {
  },
})
