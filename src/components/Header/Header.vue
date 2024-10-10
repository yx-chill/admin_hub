<script setup>
import { useStateStore } from '@/stores/state'
import { storeToRefs } from 'pinia'
import { useDateFormat, useNow, useDark, useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { NAvatar } from 'naive-ui'

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)

const state = useStateStore()
const { menuState } = storeToRefs(state)
const toggleMenu = useToggle(menuState)
</script>

<template>
  <header class="header">
    <div class="flex">
      <button type="button" class="btn-hamburger" @click="toggleMenu()">
        <Icon icon="pepicons-print:hamburger" />
      </button>
      <time>{{ formatted }}</time>
    </div>

    <div class="flex">
      <button type="button" class="btn-color-scheme" @click="toggleDark()">
        <Icon v-if="isDark" icon="ph:sun-duotone" />
        <Icon v-else icon="ph:moon-duotone" />
      </button>

      <RouterLink class="link-profile" to="/profile">
        <NAvatar
          v-if="1"
          round
          size="36"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <Icon v-else icon="lineicons:user" />
      </RouterLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  column-gap: 10px;

  .btn-hamburger {
    width: 40px;
    aspect-ratio: 1;
    justify-content: center;
    align-items: center;
    background: var(--color-background);
    border-radius: 50%;
    border: none;
    padding: 0;
    display: none;

    @media (max-width: 1280px) {
      display: flex;
    }

    svg {
      width: 50%;
      height: 50%;
      color: var(--color-text);
    }
  }

  .link-profile {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color-background);
    border-radius: 50%;
    margin-left: 10px;

    svg {
      width: 50%;
      height: 50%;
      color: var(--color);
    }
  }
}
</style>

<style lang="scss">
.link-profile {
  .n-avatar {
    width: 100%;
    height: 100%;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}
</style>
