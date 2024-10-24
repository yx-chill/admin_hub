<script setup>
import { NSwitch } from 'naive-ui'
import railStyle from '@/utils/railStyle.js'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnsConfirm from '@/components/Btn/BtnsSubmit.vue'

const breadcrumbList = [{ title: '角色管理', name: 'Role' }, { title: '編輯' }]

const submit = () => {
  console.log('submit')
}
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="Role" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="role-content block">
      <h3 class="page-title">角色權限管理</h3>

      <ul class="permission-table">
        <li class="head permission-item sticky-header row-item">
          <div class="">資源名稱</div>
          <div class="center">瀏覽</div>
          <div class="center">新增</div>
          <div class="center">編輯</div>
          <div class="center">刪除</div>
        </li>

        <template v-for="i in 5" :key="i">
          <li class="permission-item row-item">
            <div class="">文章管理</div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
          </li>

          <li class="permission-item row-item">
            <div class="">知識管理</div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
            <div class="center">
              <NSwitch size="small" :round="false" :rail-style="railStyle" />
            </div>
          </li>
        </template>
      </ul>

      <BtnsConfirm @submit="submit" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.permission-item {
  display: grid;
  grid-template-columns: 1fr repeat(4, 100px);
  column-gap: 5px;
  align-items: center;
  letter-spacing: 0.1em;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  .center {
    text-align: center;
  }
}
</style>
