<script setup>
import Editor from '@/components/Editor/Editor.vue'
import { ref } from 'vue'

const test = ref('<p>I’m running Tiptap with Vue.js. 🎉</p>')
</script>

<template>
  <main class="main">
    <section class="block">
      <h3 class="page-title">Editor</h3>

      <Editor v-model="test" label="內容" memo="這是備註" />

      <p class="test">{{ test }}</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.test {
  word-break: break-all;
}
</style>
