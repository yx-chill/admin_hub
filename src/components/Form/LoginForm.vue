<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin, NForm, NFormItem, NInput, NCheckbox, NButton } from 'naive-ui'

import { useAuthStore } from '@/stores/auth'
import { login } from '@/api/auth'
import { successMsg } from '@/composables/useMessage'

const accountRef = ref(null)
const pending = ref(false)
const router = useRouter()
const authStore = useAuthStore()
// formRef
const formRef = ref(null)
// formValue
const formValue = ref({
  account: '',
  password: '',
  remember: false
})
// rules
const rules = {
  account: {
    required: true,
    message: '請輸入帳號',
    trigger: ['input', 'blur']
  },
  password: {
    required: true,
    message: '請輸入密碼',
    trigger: ['input', 'blur']
  }
}

const handleLogin = async (data) => {
  pending.value = true

  try {
    const res = await login(data)
    authStore.setUser(res)
    await router.push({ name: 'index' })
    successMsg(`歡迎 ${res.name}`)
  } catch (err) {
    accountRef.value?.focus()
  } finally {
    reset()
    pending.value = false
  }
}

const handleValidateButtonClick = (e) => {
  e.preventDefault()
  if (pending.value) return

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await handleLogin({
        account: formValue.value.account,
        password: formValue.value.password,
        remember: formValue.value.remember
      })
    } else {
      scrollAndFocusToError(errors)
    }
  })
}

function scrollAndFocusToError(errors) {
  const target = document.querySelector(`.login-form .${errors[0][0]?.field} input`)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => target.focus(), 100)
  }
}

function reset() {
  formValue.value = {
    account: '',
    password: '',
    remember: false
  }
}
</script>

<template>
  <NSpin :show="pending" size="medium" stroke="4a90e2">
    <NForm
      ref="formRef"
      class="login-form"
      inline
      :model="formValue"
      :rules="rules"
      size="large"
      @keyup.enter="handleValidateButtonClick"
    >
      <div class="remember-block">
        <NFormItem label="帳號" class="account form-item" path="account">
          <NInput ref="accountRef" v-model:value="formValue.account" placeholder="Account" />
        </NFormItem>

        <NCheckbox v-model:checked="formValue.remember"> 記住我 </NCheckbox>
      </div>

      <NFormItem label="密碼" class="password form-item" path="password">
        <NInput
          type="password"
          show-password-on="mousedown"
          v-model:value="formValue.password"
          placeholder="Password"
          @keydown.enter.prevent
        />
      </NFormItem>
    </NForm>

    <NButton type="primary" class="btn-form" ghost block strong @click="handleValidateButtonClick">
      登入
    </NButton>
  </NSpin>
</template>

<style lang="scss" scoped>
.remember-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
}
</style>
