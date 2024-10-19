<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<template>
  <RouterLink class="logo" :to="{ name: 'index' }" title="Home">
    <img v-if="isDark" src="@/assets/images/logo_dark.svg" alt="Admin Hub" />
    <img v-else src="@/assets/images/logo.svg" alt="Admin Hub" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  max-width: 200px;
  aspect-ratio: 4 / 1;
}
</style>
