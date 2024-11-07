<script setup>
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'

const breadcrumbList = [{ title: 'Banner維護' }]
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="index" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="block">
      <h3 class="page-title">Banner維護</h3>

      <!-- head -->
      <div class="banner-list-header sticky-header row-item banner-grid">
        <p class="">頁面</p>
        <p class="center">圖片</p>
        <p class="center">更新日期</p>
        <p class="center">操作</p>
      </div>

      <ul class="banner-list" v-auto-animate>
        <li class="banner-grid row-item">
          <!-- 頁面 -->
          <div class="item">
            <span>關於我們</span>
          </div>
          <!-- 圖片 -->
          <div class="item center"></div>
          <!-- 更新日期 -->
          <div class="item center">
            <time>2024-11-05 21:40:18</time>
          </div>
          <!-- 操作 -->
          <div class="operate item"></div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="css" scoped>
.banner-list-header {
  margin-bottom: 10px;
}

.banner-list {
  letter-spacing: 0.05em;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.banner-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 200px 150px;
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
  }
}
</style>
