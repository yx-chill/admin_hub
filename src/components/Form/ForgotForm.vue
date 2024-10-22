<script setup>
import { ref, computed } from 'vue'
import { NSpin, NForm, NFormItem, NAutoComplete, NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/state'
import { forgotPassword } from '@/api/auth'
import { successMsg } from '@/composables/useMessage'

const stateStore = useStateStore()
const { emailList } = storeToRefs(stateStore)
const pending = ref(false)

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
  return emailList.value.map((suffix) => {
    const prefix = formValue.value.email.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})

const handleForgot = async (data) => {
  pending.value = true
  const res = await forgotPassword(data)
  successMsg(res.message)

  reset()
  pending.value = false
}

const handleValidateButtonClick = (e) => {
  e.preventDefault()
  if (pending.value) return

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await handleForgot({
        email: formValue.value.email
      })
    } else {
      scrollAndFocusToError(errors)
    }
  })
}

function scrollAndFocusToError(errors) {
  const target = document.querySelector(`.forgot-form .${errors[0][0]?.field} input`)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })

    setTimeout(() => target.focus(), 100)
  }
}

function reset() {
  formValue.value = {
    email: ''
  }
}
</script>

<template>
  <NSpin :show="pending" size="medium" stroke="4a90e2">
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
  </NSpin>
</template>

<style lang="scss" scoped></style>
