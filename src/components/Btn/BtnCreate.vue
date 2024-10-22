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
  <RouterLink class="btn-create" :to="{ name, params }">
    <Icon icon="typcn:plus-outline" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.btn-create {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 12px;
  right: var(--base-gap);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: var(--color);
  border-radius: 50%;
  border: none;
  padding: 0;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: inherit;
    background: inherit;
    filter: blur(8px);
  }

  svg {
    width: 70%;
    height: 70%;
  }
}
</style>
