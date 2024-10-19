<script setup>
import { NTabs, NTabPane } from 'naive-ui'
import ResetPasswordForm from '@/components/Form/ResetPasswordForm.vue'
</script>

<template>
  <main class="main">
    <section class="block">
      <div class="form-block">
        <NTabs
          default-value="reset"
          size="large"
          class="form-tabs"
          justify-content="space-evenly"
          animated
        >
          <NTabPane name="reset" tab="重設密碼">
            <ResetPasswordForm />
          </NTabPane>
        </NTabs>

        <div class="links">
          <RouterLink :to="{ name: 'Login' }">我要登入</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
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

.links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;

  a {
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-decoration: underline;
    text-underline-offset: 2px;
    color: var(--color-base);
    transition: color 0.3s ease;

    &:hover {
      color: var(--color);
    }
  }
}
</style>
