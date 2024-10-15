<script setup>
import WebLogo from '@/components/WebLogo.vue'
import HeaderTime from '@/components/Header/HeaderTime.vue'
import BtnColorScheme from '@/components/Btn/BtnColorScheme.vue'
</script>

<template>
  <header class="header login-header">
    <WebLogo />

    <div class="time">
      <HeaderTime />
    </div>

    <BtnColorScheme />
  </header>
</template>

<style lang="scss" scoped>
.login-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.time {
  text-align: center;
}
</style>
