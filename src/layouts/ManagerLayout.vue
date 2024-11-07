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
  display: grid;
  grid-template-columns: 270px calc(100% - 270px - 20px);
  align-items: flex-start;
  column-gap: var(--base-gap);

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
}

.content {
  flex: 1;
  min-height: calc(100dvh - 40px);
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap);
}
</style>
