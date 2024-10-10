<script setup>
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { ref } from 'vue'

// formRef
const formRef = ref(null)
// formValue
const formValue = ref({
  account: '',
  password: ''
})
// rules
const rules = {
  account: {
    required: true,
    message: '請輸入帳號',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '請輸入密碼',
    trigger: 'blur'
  }
}
</script>

<template>
  <NForm ref="formRef" class="login-form" inline :model="formValue" :rules="rules" size="large">
    <NFormItem label="帳號" class="account form-item" path="account">
      <NInput v-model:value="formValue.account" placeholder="Account" />
    </NFormItem>

    <NFormItem label="密碼" class="password form-item" path="password">
      <NInput
        type="password"
        show-password-on="mousedown"
        v-model:value="formValue.password"
        placeholder="Password"
      />
    </NFormItem>
  </NForm>
  <NButton type="primary" class="btn-form" ghost block strong> Sign In </NButton>
</template>

<style lang="scss" scoped></style>
