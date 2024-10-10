<script setup>
import { NForm, NFormItem, NInput, NAutoComplete, NButton } from 'naive-ui'
import { ref, computed } from 'vue'

// formRef
const formRef = ref(null)
// formValue
const formValue = ref({
  account: '',
  name: '',
  email: '',
  password: '',
  password_comfirmation: ''
})
// rules
const rules = {
  account: {
    required: true,
    message: '請輸入帳號',
    trigger: 'blur'
  },
  name: {
    required: true,
    message: '請輸入姓名',
    trigger: 'blur'
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
    trigger: 'blur'
  }
}

const emailList = [
  '@gmail.com',
  '@yahoo.com.tw',
  '@hotmail.com',
  '@outlook.com',
  '@msn.com',
  '@pchome.com.tw'
]

const emailOptions = computed(() => {
  return emailList.map((suffix) => {
    const prefix = formValue.value.email.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})
</script>

<template>
  <div class="form-content">
    <NForm
      ref="formRef"
      class="login-form"
      inline
      :model="formValue"
      :rules="rules"
      size="large"
      :show-label="false"
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
          <NAutoComplete
            v-model:value="formValue.email"
            :options="emailOptions"
            placeholder="Email"
            disabled
          />
        </NFormItem>
      </div>

      <div class="form-item-group">
        <p class="label">姓名</p>

        <NFormItem label="姓名" class="name form-item" path="name">
          <NInput v-model:value="formValue.name" placeholder="Name" />
        </NFormItem>
      </div>

      <div class="form-item-group">
        <p class="label">新密碼</p>

        <NFormItem label="新密碼" class="password form-item" path="password">
          <NInput
            type="password"
            show-password-on="mousedown"
            v-model:value="formValue.password"
            placeholder="Password"
          />
        </NFormItem>
      </div>

      <div class="form-item-group">
        <p class="label">確認密碼</p>

        <NFormItem
          label="確認密碼"
          class="password_comfirmation form-item"
          path="password_comfirmation"
        >
          <NInput
            type="password"
            show-password-on="mousedown"
            v-model:value="formValue.password_comfirmation"
            placeholder="Reenter Password"
          />
        </NFormItem>
      </div>
    </NForm>

    <NButton type="primary" class="btn-form" ghost block strong> 修改 </NButton>
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
