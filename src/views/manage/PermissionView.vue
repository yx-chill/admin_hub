<script setup>
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnCreate from '@/components/Btn/BtnCreate.vue'

const breadcrumbList = [{ title: '權限管理' }]
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="Role" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="permission-list-block block">
      <h3 class="page-title">權限管理</h3>

      <BtnCreate name="" />

      <div class="permission-list-header permission-grid sticky-header row-item">
        <p class="">名稱</p>
        <p class="">資源名稱</p>
        <p class="center">瀏覽</p>
        <p class="center">新增</p>
        <p class="center">編輯</p>
        <p class="center">刪除</p>
        <p class="center">操作</p>
      </div>

      <ul class="permission-list">
        <li class="row-item permission-grid">
          <div class="item">
            <span>文章管理</span>
          </div>
          <div class="item">
            <span>news</span>
          </div>
          <div class="center item"></div>
          <div class="center item"></div>
          <div class="center item"></div>
          <div class="center item"></div>
          <div class="operate item">
            <RouterLink :to="{ name: 'RoleEdit', params: { id: 1 } }">編輯</RouterLink>
            <button type="button" class="del">刪除</button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.permission-list-block {
  position: relative;
}

.permission-list-header {
  margin-bottom: 10px;
}

.permission-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr repeat(4, 100px) 150px;
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
  }
}
</style>
