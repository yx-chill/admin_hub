<script setup>
import { computed, ref } from 'vue'
import { NSpin, NForm, NFormItem, NInput, NDivider, NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { changeProfile } from '@/api/auth'
import { successMsg } from '@/composables/useMessage'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const rPasswordFormItemRef = ref(null)
const pending = ref(false)
// formRef
const formRef = ref(null)
// formValue
const formValue = ref({
  account: user.value.account || '',
  name: user.value.name || '',
  email: user.value.email || '',
  current_password: '',
  password: '',
  password_confirmation: ''
})
// rules
const rules = computed(() => ({
  name: {
    required: true,
    message: '請輸入姓名',
    trigger: 'blur'
  },
  current_password: {
    required: formValue.value.password || formValue.value.password_confirmation,
    message: '請輸入舊密碼',
    trigger: ['input', 'blur']
  },
  password: {
    required: formValue.value.current_password,
    message: '請輸入新密碼',
    trigger: ['input', 'blur']
  },
  password_confirmation: [
    {
      required: formValue.value.password,
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
}))

// 判斷是否有修改姓名
const isChangeName = computed(() => formValue.value.name !== user.value.name)
// 判斷是否有修改密碼
const isChangePassword = computed(
  () =>
    !!formValue.value.current_password &&
    !!formValue.value.password &&
    !!formValue.value.password_confirmation
)

const handleChangeProfile = async (data) => {
  try {
    pending.value = true
    const res = await changeProfile(data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    user.value.name = res.name
    successMsg('修改成功！')
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
      const data = new FormData()
      data.append('_method', 'put')
      data.append('name', formValue.value.name)

      if (isChangePassword.value) {
        data.append('current_password', formValue.value.current_password)
        data.append('password', formValue.value.password)
        data.append('password_confirmation', formValue.value.password_confirmation)
      }

      await handleChangeProfile(data)
    } else {
      scrollAndFocusToError(errors)
    }
  })
}

function scrollAndFocusToError(errors) {
  const target = document.querySelector(`.profile-form .${errors[0][0]?.field} input`)

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
    formValue.value.password.startsWith(value) && formValue.value.password.length >= value.length
  )
}

function validatePasswordSame(rule, value) {
  return value === formValue.value.password
}

function reset() {
  formValue.value = {
    account: user.value.account || '',
    name: user.value.name || '',
    email: user.value.email || '',
    current_password: '',
    password: '',
    password_confirmation: ''
  }
}
</script>

<template>
  <div class="form-content">
    <NSpin :show="pending" size="medium" stroke="4a90e2">
      <NForm
        ref="formRef"
        class="profile-form login-form"
        inline
        :model="formValue"
        :rules="rules"
        size="large"
        :show-label="false"
        @keyup.enter="handleValidateButtonClick"
      >
        <div class="form-item-group">
          <p class="label">帳號</p>

          <NFormItem label="帳號" class="account form-item" path="account">
            <NInput v-model:value="formValue.account" placeholder="Account" disabled />
          </NFormItem>
        </div>

        <div class="form-item-group">
          <p class="label">Email</p>

          <NFormItem label="Email" class="email form-item" path="email">
            <NInput v-model:value="formValue.email" placeholder="Email" disabled />
          </NFormItem>
        </div>

        <div class="form-item-group">
          <p class="label">姓名</p>

          <NFormItem label="姓名" class="name form-item" path="name">
            <NInput v-model:value="formValue.name" placeholder="Name" />
          </NFormItem>
        </div>

        <NDivider> 修改密碼 </NDivider>

        <div class="form-item-group">
          <p class="label">舊密碼</p>

          <NFormItem label="舊密碼" class="current_password form-item" path="current_password">
            <NInput
              type="password"
              show-password-on="mousedown"
              v-model:value="formValue.current_password"
              placeholder="Password"
              @keydown.enter.prevent
            />
          </NFormItem>
        </div>

        <div class="form-item-group">
          <p class="label">新密碼</p>

          <NFormItem label="新密碼" class="password form-item" path="password">
            <NInput
              type="password"
              show-password-on="mousedown"
              v-model:value="formValue.password"
              placeholder="New Password"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </NFormItem>
        </div>

        <div class="form-item-group">
          <p class="label">確認密碼</p>

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
        </div>
      </NForm>

      <NButton
        type="primary"
        class="btn-form"
        ghost
        block
        strong
        :disabled="!(isChangeName || isChangePassword)"
        @click="handleValidateButtonClick"
      >
        修改
      </NButton>
    </NSpin>
  </div>
</template>

<style lang="scss" scoped>
.form-content {
  max-width: 500px;
  margin: 0 auto;
}

.form-item-group {
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 10px;

  .label {
    width: 100px;
    flex-shrink: 0;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--color-text);

    @include xs {
      max-width: 80px;
    }
  }
}
</style>
