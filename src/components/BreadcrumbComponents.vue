<script setup>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem>
      <RouterLink :to="{ name: 'index' }" class="link" title="首頁">首頁</RouterLink>
    </NBreadcrumbItem>
    <NBreadcrumbItem v-for="(item, i) in list" :key="`breadcrumbItem${i}`">
      <RouterLink
        v-if="item.name"
        :to="{ name: item.name, params: item.params }"
        class="link"
        :title="item.title"
      >
        {{ item.title }}
      </RouterLink>
      <span v-else class="link">
        {{ item.title }}
      </span>
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<style lang="scss" scoped>
.link {
  font-size: 0.9375rem;
  letter-spacing: 0.05em;
  color: var(--color-text);
}
</style>
