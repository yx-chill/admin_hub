<script setup>
import { Icon } from '@iconify/vue'
import { useDateFormat, useNow, useDark, useToggle } from '@vueuse/core'

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light'
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="header login-header">
    <RouterLink class="logo" to="/">
      <img v-if="isDark" src="@/assets/images/logo_dark.svg" alt="Admin Hub" />
      <img v-else src="@/assets/images/logo.svg" alt="Admin Hub" />
    </RouterLink>

    <div class="time">
      <time>{{ formatted }}</time>
    </div>

    <button type="button" class="btn-color-scheme" @click="toggleDark()">
      <Icon v-if="isDark" icon="ph:sun-duotone" />
      <Icon v-else icon="ph:moon-duotone" />
    </button>
  </header>
</template>

<style lang="scss" scoped>
.login-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.time {
  text-align: center;
}

.btn-color-scheme {
  margin-left: auto;
}
</style>
