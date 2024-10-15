<script setup>
import { NForm, NFormItem, NAutoComplete, NButton } from 'naive-ui'
import { ref, computed } from 'vue'

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
  email: ''
})
// rules
const rules = {
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
  }
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
        email: formValue.value.email
      }

      console.log(body)
    } else {
      const target = document.querySelector(`.forgot-form .${errors[0][0]?.field} input`)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })

        setTimeout(() => {
          target.focus()
        }, 100)
      }
    }
  })
}
</script>

<template>
  <NForm
    ref="formRef"
    class="forgot-form login-form"
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
        placeholder="mail@example.com"
      />
    </NFormItem>
  </NForm>

  <NButton type="primary" class="btn-form" ghost block strong @click="handleValidateButtonClick">
    送出
  </NButton>
</template>

<style lang="scss" scoped></style>
