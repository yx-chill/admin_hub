<script setup>
import LoginHeader from '@/components/Header/LoginHeader.vue'
</script>

<template>
  <div class="page">
    <div class="content">
      <LoginHeader />
      <slot />
      <p class="copyright">Copyright &copy;</p>
    </div>
  </div>
</template>

<style scoped>
.content {
  min-height: calc(100dvh - 40px);
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap);
}
</style>
