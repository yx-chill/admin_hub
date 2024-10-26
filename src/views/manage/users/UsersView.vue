<script setup>
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { NSpin, NSwitch } from 'naive-ui'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import railStyle from '@/utils/railStyle'

const breadcrumbList = [{ title: '帳號管理' }]
const active = ref(false)
const pending = ref(false)

const handleChange = useDebounceFn((value) => {
  console.log(value)
  // 更改狀態Api
}, 300)
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="index" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="block">
      <h3 class="page-title">帳號管理</h3>

      <div class="users-list-header users-grid sticky-header row-item">
        <p>帳號</p>
        <p>姓名</p>
        <p>Email</p>
        <p class="center">狀態</p>
        <p class="center">驗證</p>
        <p class="center">操作</p>
      </div>

      <NSpin :show="pending" size="large" stroke="4a90e2">
        <ul class="users-list">
          <li v-for="i in 5" :key="i" class="users-item users-grid row-item">
            <div class="item">x565619</div>

            <div class="item">Huanan</div>

            <div class="item">x565619@gmail.com</div>

            <div class="center item">
              <NSwitch
                v-model:value="active"
                size="small"
                :round="false"
                :rail-style="railStyle"
                @update:value="handleChange"
              />
            </div>

            <div class="verifiy-state item">
              <span class="status" :class="{ 'not-verified': i % 2 === 0 }"></span>
            </div>

            <div class="operate item">
              <RouterLink :to="{ name: 'Users' }">編輯</RouterLink>
              <button type="button" class="del">刪除</button>
            </div>
          </li>
        </ul>
      </NSpin>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.users-list-header {
  margin-bottom: 10px;

  p {
    font-size: 1.0625rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--color-text);
  }
}

.users-item {
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  .item {
    letter-spacing: 0.05em;
  }

  .verifiy-state {
    .status {
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      margin: 0 auto;

      &.not-verified {
        &::before,
        &::after {
          background-color: var(--red);
        }
      }

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--color);
        border-radius: 3px;
        filter: blur(5px);
        pointer-events: none;
      }

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--color);
        border-radius: 3px;
      }
    }
  }
}

.users-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 100px 100px 150px;
  align-items: center;
  column-gap: 5px;
  line-height: 1.5;

  .center {
    text-align: center;
  }
}
</style>
