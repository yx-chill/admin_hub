<script setup>
import { NAvatar } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { useStateStore } from '@/stores/state'
import { useAuthStore } from '@/stores/auth'
import HeaderTime from '@/components/Header/HeaderTime.vue'
import BtnColorScheme from '@/components/Btn/BtnColorScheme.vue'

const stateStore = useStateStore()
const authStore = useAuthStore()
const { menuState } = storeToRefs(stateStore)
const { isAuthenticated, user } = storeToRefs(authStore)
const toggleMenu = useToggle(menuState)
</script>

<template>
  <header class="header">
    <div class="flex">
      <button type="button" class="btn-hamburger" @click="toggleMenu()">
        <Icon icon="pepicons-print:hamburger" />
      </button>
      <HeaderTime />
    </div>

    <div class="flex">
      <BtnColorScheme />

      <RouterLink v-if="isAuthenticated" class="link-profile" :to="{ name: 'Profile' }" title="You">
        <NAvatar v-if="user.avatar" round size="36" :src="user.avatar" />
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
