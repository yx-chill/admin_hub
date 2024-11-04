<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  action: {
    type: Function,
    required: true
  },
  isActive: {
    type: Function,
    default: () => false
  }
})
</script>

<template>
  <button
    type="button"
    class="btn-editor-item"
    :class="{ active: isActive?.() }"
    :title="title"
    @click="action"
  >
    <Icon :icon="icon" />
  </button>
</template>

<style lang="scss" scoped></style>
