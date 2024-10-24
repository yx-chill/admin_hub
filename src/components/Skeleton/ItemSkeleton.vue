<script setup>
import { NSkeleton } from 'naive-ui'
</script>
<template>
  <ul class="item-skeleton">
    <li v-for="i in 5" :key="`itemSkeleton${i}`">
      <NSkeleton height="50px" />
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.item-skeleton {
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  .n-skeleton {
    border-radius: 0.25rem;
  }
}
</style>

<style lang="scss">
.item-skeleton {
  .n-skeleton {
    border-radius: 0.25rem;
  }
}
</style>
