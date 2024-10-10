<script setup>
import Header from '@/components/Header/Header.vue'
import Menu from '@/components/Menu.vue'
</script>

<template>
  <div class="page">
    <Menu />
    <div class="content">
      <Header />
      <slot />
      <p class="copyright">Copyright &copy;</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  display: flex;
  align-items: flex-start;
  column-gap: var(--base-gap);
}

.content {
  flex: 1;
  min-height: calc(100dvh - 40px);
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap);
}
</style>
