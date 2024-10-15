<script setup>
import { useDateFormat, useNow } from '@vueuse/core'

const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
</script>

<template>
  <time>{{ formatted }}</time>
</template>

<style lang="scss" scoped>
time {
  font-size: 1.125rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: var(--color);
  background: var(--color-background);
  border-radius: 50px;
  padding: 4px 20px 5px;

  @include md {
    font-size: 1rem;
  }

  @include sm {
    display: none;
  }
}
</style>
