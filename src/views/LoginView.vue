<script setup>
import { NTabs, NTabPane } from 'naive-ui'
import LoginForm from '@/components/Form/LoginForm.vue'
import RegisterForm from '@/components/Form/RegisterForm.vue'
import ForgotForm from '@/components/Form/ForgotForm.vue'

// https://spike-vue-free.netlify.app/
</script>

<template>
  <main class="main">
    <section class="block">
      <div class="form-block">
        <NTabs
          default-value="signin"
          size="large"
          class="form-tabs"
          justify-content="space-evenly"
          animated
        >
          <NTabPane name="signin" tab="登入">
            <LoginForm />
          </NTabPane>

          <NTabPane name="signup" tab="註冊">
            <RegisterForm />
          </NTabPane>

          <NTabPane name="forget" tab="忘記密碼">
            <ForgotForm />
          </NTabPane>
        </NTabs>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.block {
  &:has(.form-block) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

.form-block {
  max-width: 380px;
  margin: 0 auto;
}
</style>
