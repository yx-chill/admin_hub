<script setup>
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light'
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    type="button"
    class="btn-color-scheme"
    :title="isDark ? 'Light' : 'Dark'"
    @click="toggleDark()"
  >
    <Icon v-if="isDark" icon="ph:sun-duotone" />
    <Icon v-else icon="ph:moon-duotone" />
  </button>
</template>

<style lang="scss" scoped>
.btn-color-scheme {
  width: 40px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-background);
  border-radius: 50%;
  border: none;
  padding: 0;
  margin-left: auto;

  svg {
    width: 50%;
    height: 50%;
    color: var(--color);
  }
}
</style>
