<script setup>
import { NForm, NFormItem, NInput, NAutoComplete, NButton } from 'naive-ui'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { token } = route.params
const { email } = route.query
const rPasswordFormItemRef = ref(null)
const emailList = [
  '@gmail.com',
  '@yahoo.com.tw',
  '@hotmail.com',
  '@outlook.com',
  '@msn.com',
  '@pchome.com.tw'
]
// formRef
const formRef = ref(null)
// formValue
const formValue = ref({
  email,
  password: '',
  password_confirmation: ''
})
// rules
const rules = {
  email: {
    required: true,
    message: '請輸入信箱',
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
  return emailList.map((suffix) => {
    const prefix = formValue.value.email.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})

const handleValidateButtonClick = (e) => {
  e.preventDefault()

  formRef.value?.validate((errors) => {
    if (!errors) {
      const body = {
        token,
        email: formValue.value.email,
        password: formValue.value.password,
        password_confirmation: formValue.value.password_confirmation
      }

      console.log(body)
    } else {
      const target = document.querySelector(`.reset-form .${errors[0][0]?.field} input`)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })

        setTimeout(() => {
          target.focus()
        }, 100)
      }
    }
  })
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

function reset() {
  formValue.value = {
    email: '',
    password: '',
    password_confirmation: ''
  }
}
</script>

<template>
  <NForm
    ref="formRef"
    class="reset-form login-form"
    inline
    :model="formValue"
    :rules="rules"
    size="large"
    @keyup.enter="handleValidateButtonClick"
  >
    <NFormItem label="Email" class="email form-item" path="email">
      <NAutoComplete
        v-model:value="formValue.email"
        :options="emailOptions"
        placeholder="Email"
        disabled
      />
    </NFormItem>

    <NFormItem label="新密碼" class="password form-item" path="password">
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
    送出
  </NButton>
</template>

<style lang="scss" scoped></style>
