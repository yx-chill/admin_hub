<script setup>
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useDark } from '@vueuse/core'
import { ref, watch } from 'vue'

const theme = ref(null)
const isDark = useDark()

watch(
  isDark,
  (newVal) => {
    theme.value = newVal ? darkTheme : null
  },
  { immediate: true }
)
</script>

<template>
  <NConfigProvider :theme="theme">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
  </NConfigProvider>
</template>

<style scoped></style>
