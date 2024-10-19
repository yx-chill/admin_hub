<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NScrollbar } from 'naive-ui'

import { onClickOutside } from '@vueuse/core'
import { useStateStore } from '@/stores/state'
import { useAuthStore } from '@/stores/auth'
import { logout } from '@/api/auth'
import { Icon } from '@iconify/vue'
import WebLogo from '@/components/WebLogo.vue'

const menuRef = ref(null)
const stateStore = useStateStore()
const { menuState } = storeToRefs(stateStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const router = useRouter()

onClickOutside(menuRef, () => {
  menuState.value = false
})

const handleLogout = async () => {
  await logout()
  user.value.id = ''
  await router.push({ name: 'Login' })
  authStore.clearUser()
}
</script>

<template>
  <div ref="menuRef" class="menu" :class="{ show: menuState }">
    <div class="menu-Header">
      <WebLogo />
    </div>

    <NScrollbar style="flex: 1">
      <div class="group">
        <p class="group-title">管理</p>

        <ul class="links">
          <li>
            <RouterLink class="link" to="/about">
              <div class="icon">
                <Icon icon="lets-icons:shop-duotone" />
              </div>
              店家資訊
            </RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="ic:twotone-table-restaurant" />
              </div>
              桌號設定
            </RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="solar:sort-by-time-line-duotone" />
              </div>
              訂位控管
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="group">
        <p class="group-title">管理</p>

        <ul class="links">
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="lets-icons:shop-duotone" />
              </div>
              店家資訊
            </RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="ic:twotone-table-restaurant" />
              </div>
              桌號設定
            </RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="solar:sort-by-time-line-duotone" />
              </div>
              訂位控管
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="group">
        <p class="group-title">管理</p>

        <ul class="links">
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="lets-icons:shop-duotone" />
              </div>
              店家資訊
            </RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="ic:twotone-table-restaurant" />
              </div>
              桌號設定
            </RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/">
              <div class="icon">
                <Icon icon="solar:sort-by-time-line-duotone" />
              </div>
              訂位控管
            </RouterLink>
          </li>
        </ul>
      </div>
    </NScrollbar>

    <div class="menu-footer">
      <button type="button" class="btn-logout" title="登出" @click="handleLogout">
        <Icon icon="clarity:logout-line" />
        登出
      </button>
    </div>
  </div>

  <div class="backdrop" :class="{ show: menuState }"></div>
</template>

<style lang="scss" scoped>
.menu {
  position: sticky;
  top: var(--base-gap);
  z-index: 100;
  width: 270px;
  height: calc(100dvh - 40px);
  display: flex;
  flex-direction: column;
  background: var(--block-color-background);
  border-radius: var(--block-border-radius);
  box-shadow: var(--block-box-shadow);
  transition: transform 0.5s ease;
  overflow: hidden;

  @media (max-width: 1280px) {
    position: fixed;
    top: var(--base-gap);
    left: var(--base-gap);
    transform: translate(calc(-100% - var(--base-gap)));
  }

  &.show {
    @media (max-width: 1280px) {
      transform: translate(0);
    }
  }
}

.menu-Header,
.menu-footer {
  text-align: center;
  padding: 15px 20px;

  .logo {
    display: block;
  }

  .btn-logout {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--color);
    background: var(--color-background);
    border-radius: 50px;
    border: none;
    padding: 10px;

    svg {
      font-size: 1.125rem;
      transform: translateY(1px);
    }
  }
}

.group {
  &:nth-child(n + 1) {
    margin-top: 20px;
  }

  &-title {
    font-size: 0.75rem;
    line-height: 2;
    letter-spacing: 0.1em;
    color: var(--menu-title-color);
    padding: 0 24px;
    margin-bottom: 12px;
  }

  .links {
    display: flex;
    flex-direction: column;
    row-gap: 5px;

    li {
      position: relative;
      padding: 0 16px;
    }

    .link {
      display: flex;
      align-items: center;
      column-gap: 12px;
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      color: var(--color-base);
      transition: 0.3s;
      padding: 5px 0;

      &.router-link-exact-active {
        color: var(--color);
      }

      &:hover {
        &::before {
          transform: translate(0);
        }

        .icon {
          color: var(--color);
        }
      }

      &::before {
        content: '';
        display: block;
        width: calc(100% - 16px);
        height: 100%;
        background: var(--color);
        opacity: 0.18;
        border-radius: 0 50px 50px 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: 0.4s ease-in-out;
        transform: translate(-100%);
      }

      .icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          font-size: 1.25rem;
        }
      }
    }
  }
}

.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  transition: 0.5s ease;

  &.show {
    @media (max-width: 1280px) {
      background-color: var(--backdrop-background);
      backdrop-filter: blur(2px);
      z-index: 99;
    }
  }
}
</style>
