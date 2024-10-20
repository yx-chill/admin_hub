<script setup>
import { NScrollbar } from 'naive-ui'
</script>

<template>
  <main class="main">
    <NScrollbar>
      <section class="block"></section>
    </NScrollbar>
  </main>
</template>

<style lang="scss">
main.main {
  display: flex;
}

section.block {
  height: 200vh;
}
</style>
