<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NSpin } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { reSend } from '@/api/api'
import { logout } from '@/api/auth'
import { successMsg } from '@/composables/useMessage'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const pending = ref(false)

// 重寄驗證信
const handleReSend = async () => {
  if (pending.value) return

  try {
    pending.value = true
    await reSend()
    successMsg('新的驗證信已發送，請至信箱確認！')
  } catch (error) {
    console.log('email verify notification', error)
  } finally {
    pending.value = false
  }
}

// 登出
const handleLogout = async () => {
  await logout()
  user.value.id = ''
  await router.push({ name: 'Login' })
  authStore.clearUser()
}
</script>

<template>
  <main class="main">
    <section class="block">
      <div class="block-container">
        <p>{{ `Hi ${user?.name}！` }}</p>
        <p>感謝您的註冊！此帳號尚未驗證</p>
        <p>請透過點擊電子郵件內的連結來驗證您的帳號。</p>

        <div class="btns">
          <NSpin :show="pending" size="small" stroke="4a90e2">
            <button type="button" class="send" title="重寄驗證信" @click="handleReSend">
              重寄驗證信
            </button>
          </NSpin>
          <button type="button" class="logout" title="登出" @click="handleLogout">登出</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.block {
  max-width: 450px;
  margin: 0 auto;
  margin-top: 80px;

  p {
    text-align: center;
    font-weight: 500;
    letter-spacing: 0.08em;
  }

  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 16px;
    padding-top: 20px;
  }

  button {
    font-size: 1rem;
    letter-spacing: 0.05em;
    border: none;
    background: transparent;
    padding: 0;
  }

  .send {
    color: var(--color);
    background-color: var(--color-background);
    border-radius: 50px;
    padding: 4px 24px 5px;
  }

  .logout {
    text-decoration: underline;
    text-underline-offset: 2px;
    color: var(--color-base);
    padding: 2px 4px;
  }
}
</style>
