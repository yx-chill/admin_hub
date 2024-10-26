<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  name: {
    type: String,
    default: 'index'
  },
  params: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <RouterLink class="btn-back" :to="{ name, params }" title="回上一頁">
    <Icon icon="pajamas:go-back" />
    返回
  </RouterLink>
</template>

<style lang="scss" scoped>
.btn-back {
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--color-text);
  transition: color 0.3s ease;

  &:hover {
    color: var(--color);
  }

  svg {
    font-size: 1.25rem;
    transform: translateY(-1px);
  }
}
</style>
