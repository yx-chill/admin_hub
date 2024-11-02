<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin, NForm, NFormItem, NInput, NAutoComplete, NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/state'
import { useAuthStore } from '@/stores/auth'
import { register } from '@/api/auth'
import { successMsg, errorMsg } from '@/composables/useMessage'

const rPasswordFormItemRef = ref(null)
const stateStore = useStateStore()
const { emailList } = storeToRefs(stateStore)
const pending = ref(false)
const router = useRouter()
const authStore = useAuthStore()
// formRef
const formRef = ref(null)
// formValue
const formValue = ref({
  account: '',
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})
// rules
const rules = {
  account: {
    required: true,
    message: '請輸入帳號',
    trigger: ['input', 'blur']
  },
  name: {
    required: true,
    message: '請輸入姓名',
    trigger: ['input', 'blur']
  },
  email: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('請輸入Email')
      } else if (!/^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
        return new Error('Email格式錯誤')
      }
    },
    trigger: ['change', 'blur']
  },
  password: {
    required: true,
    message: '請輸入密碼',
    trigger: ['input', 'blur']
  },
  password_confirmation: [
    {
      required: true,
      message: '請輸入確認密碼',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '與新密碼不符，請重新輸入!',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '與新密碼不符，請重新輸入!',
      trigger: ['blur', 'password-input']
    }
  ]
}

const emailOptions = computed(() => {
  return emailList.value.map((suffix) => {
    const prefix = formValue.value.email.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})

const handleRegister = async (data) => {
  try {
    pending.value = true
    const res = await register(data)
    authStore.setUser(res)
    await router.push({ name: 'index' })
    successMsg(`註冊成功！ 歡迎 ${res.name}，請先完成信箱驗證`)
  } catch (error) {
    // errorMsg(error)
  } finally {
    pending.value = false
  }
}

const handleValidateButtonClick = (e) => {
  e.preventDefault()
  if (pending.value) return

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await handleRegister({
        account: formValue.value.account,
        name: formValue.value.name,
        email: formValue.value.email,
        password: formValue.value.password,
        password_confirmation: formValue.value.password_confirmation
      })
    } else {
      scrollAndFocusToError(errors)
    }
  })
}

function scrollAndFocusToError(errors) {
  const target = document.querySelector(`.register-form .${errors[0][0]?.field} input`)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })

    setTimeout(() => target.focus(), 100)
  }
}

function handlePasswordInput() {
  if (formValue.value.password_confirmation) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}

function validatePasswordStartWith(rule, value) {
  return (
    !!formValue.value.password &&
    formValue.value.password.startsWith(value) &&
    formValue.value.password.length >= value.length
  )
}

function validatePasswordSame(rule, value) {
  return value === formValue.value.password
}
</script>

<template>
  <NSpin :show="pending" size="medium" stroke="4a90e2">
    <NForm
      ref="formRef"
      class="register-form login-form"
      inline
      :model="formValue"
      :rules="rules"
      size="large"
      @keyup.enter="handleValidateButtonClick"
    >
      <NFormItem label="帳號" class="account form-item" path="account">
        <NInput v-model:value="formValue.account" placeholder="Account" />
      </NFormItem>

      <NFormItem label="姓名" class="name form-item" path="name">
        <NInput v-model:value="formValue.name" placeholder="Name" />
      </NFormItem>

      <NFormItem label="Email" class="email form-item" path="email">
        <NAutoComplete
          v-model:value="formValue.email"
          :options="emailOptions"
          placeholder="Email"
        />
      </NFormItem>

      <NFormItem label="密碼" class="password form-item" path="password">
        <NInput
          type="password"
          show-password-on="mousedown"
          v-model:value="formValue.password"
          placeholder="Password"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </NFormItem>

      <NFormItem
        ref="rPasswordFormItemRef"
        first
        label="確認密碼"
        class="password_confirmation form-item"
        path="password_confirmation"
      >
        <NInput
          type="password"
          show-password-on="mousedown"
          v-model:value="formValue.password_confirmation"
          placeholder="Reenter Password"
          :disabled="!formValue.password"
          @keydown.enter.prevent
        />
      </NFormItem>
    </NForm>

    <NButton type="primary" class="btn-form" ghost block strong @click="handleValidateButtonClick">
      註冊
    </NButton>
  </NSpin>
</template>

<style lang="scss" scoped></style>
