<script setup>
import { onMounted, ref, watch } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useDark } from '@vueuse/core'
import { getUser } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

import BgComponent from './components/Bg/BgComponent.vue'
import BgComponent2 from './components/Bg/BgComponent2.vue'

// 網站樣式主題(dark/light)
const theme = ref(null)
const isDark = useDark()

const authStore = useAuthStore()

watch(
  isDark,
  (newVal) => {
    theme.value = newVal ? darkTheme : null
  },
  { immediate: true }
)

onMounted(async () => {
  // 先取使用者資訊，若有登入將資料存在pinia
  try {
    const userData = await getUser()
    authStore.setUser(userData.data)
  } catch (error) {
    // if (error.status == 401) {
    //   watch(route, (newRoute) => {
    //     if (newRoute.meta.requireAuth) {
    //       router.push({ name: 'Login' })
    //     }
    //   })
    // }
  } finally {
    authStore.setLoading(false)
  }
})
</script>

<template>
  <NConfigProvider :theme="theme">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>

    <BgComponent />
    <BgComponent2 />
  </NConfigProvider>
</template>

<style scoped></style>
