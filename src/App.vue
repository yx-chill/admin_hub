<script setup>
import { onMounted, ref, watch } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useDark } from '@vueuse/core'
import { getUser } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

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
    authStore.setUser(userData)
  } catch (error) {
    /* empty */
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
  </NConfigProvider>
</template>

<style scoped></style>
