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
  <div class="btn-group">
    <slot />
    <RouterLink class="btn-create" :to="{ name, params }" title="新增一筆">
      <!-- <Icon icon="typcn:plus-outline" /> -->
      <Icon icon="fa-solid:plus" />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.btn-group {
  position: absolute;
  top: 12px;
  right: var(--base-gap);
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 10px;
}

.btn-create {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: var(--color);
  border-radius: 5px;
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
    width: 60%;
    height: 60%;
  }
}
</style>
