<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useDark } from '@vueuse/core'
import { getUser } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
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

      <div class="bg">
        <div class="bg-1"></div>
        <div class="bg-2"></div>
        <div class="bg-3"></div>
        <div class="bg-4"></div>
        <div class="bg-5"></div>
      </div>
    </component>
  </NConfigProvider>
</template>

<style scoped>
.bg {
  --gradient-opacity: 0.85;
  --ray-gradient: radial-gradient(
    rgba(83, 196, 255, var(--gradient-opacity)) 0%,
    rgba(43, 166, 255, 0) 100%
  );
  transition: opacity 0.25s linear;
  position: fixed;
  inset: 0;
  pointer-events: none;
  user-select: none;

  & > div {
    position: absolute;
    border-radius: 100%;
    background: var(--ray-gradient);
  }

  .bg-1 {
    width: 480px;
    height: 680px;
    transform: rotate(80deg);
    top: -540px;
    left: 250px;
    filter: blur(110px);
  }

  .bg-2 {
    width: 110px;
    height: 400px;
    transform: rotate(-20deg);
    top: -280px;
    left: 350px;
    mix-blend-mode: overlay;
    opacity: 0.6;
    filter: blur(60px);
  }

  .bg-3 {
    width: 400px;
    height: 370px;
    top: -350px;
    left: 200px;
    mix-blend-mode: overlay;
    opacity: 0.6;
    filter: blur(21px);
  }

  .bg-4 {
    position: absolute;
    width: 330px;
    height: 370px;
    top: -330px;
    left: 50px;
    mix-blend-mode: overlay;
    opacity: 0.5;
    filter: blur(21px);
  }

  .bg-5 {
    position: absolute;
    width: 110px;
    height: 400px;
    transform: rotate(-40deg);
    top: -280px;
    left: -10px;
    mix-blend-mode: overlay;
    opacity: 0.8;
    filter: blur(60px);
  }
}
</style>
