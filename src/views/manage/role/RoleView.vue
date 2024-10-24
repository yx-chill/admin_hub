<script setup>
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnCreate from '@/components/Btn/BtnCreate.vue'

const breadcrumbList = [{ title: '角色管理' }]
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="index" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="role-list-block block">
      <h3 class="page-title">角色列表</h3>

      <BtnCreate name="" />

      <div class="role-list-header role-grid sticky-header row-item">
        <p class="">名稱</p>
        <p class="center">排序</p>
        <p class="center">修改日期</p>
        <p class="center">操作</p>
      </div>

      <ul class="role-list">
        <li class="row-item role-grid">
          <div class="item">
            <span>管理者</span>
          </div>
          <div class="center item">0</div>
          <div class="center item">
            <time>2024-10-22</time>
          </div>
          <div class="operate item">
            <RouterLink :to="{ name: 'RoleEdit', params: { id: 1 } }">編輯</RouterLink>
            <button type="button" class="del">刪除</button>
          </div>
        </li>
        <li class="row-item role-grid">
          <div class="item">
            <span>編輯者</span>
          </div>
          <div class="center item">0</div>
          <div class="center item">
            <time>2024-10-22</time>
          </div>
          <div class="operate item">
            <RouterLink :to="{ name: 'RoleEdit', params: { id: 1 } }">編輯</RouterLink>
            <button type="button" class="del">刪除</button>
          </div>
        </li>
        <li class="row-item role-grid">
          <div class="item">
            <span>查看者</span>
          </div>
          <div class="center item">0</div>
          <div class="center item">
            <time>2024-10-22</time>
          </div>
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
.role-list-block {
  position: relative;
}

.role-list-header {
  margin-bottom: 10px;
}

.role-list {
  .row-item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.role-grid {
  display: grid;
  grid-template-columns: 1fr 100px 150px 150px;
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
  }
}
</style>
