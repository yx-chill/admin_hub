<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { NSpin, NSwitch, NPagination } from 'naive-ui'
import { useDebounceFn } from '@vueuse/core'
import { getUsers, deleteUsers, userStatus } from '@/api/api.js'
import { successMsg, errorMsg } from '@/composables/useMessage'

import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnCreate from '@/components/Btn/BtnCreate.vue'
import SearchComponent from '@/components/Search/SearchComponent.vue'
import ItemSkeleton from '@/components/Skeleton/ItemSkeleton.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'
import railStyle from '@/utils/railStyle'

// 分頁
const itemCount = ref(0) // 總筆數

const breadcrumbList = [{ title: '帳號管理' }]
const useAuth = useAuthStore()
const { user } = storeToRefs(useAuth)
const data = ref([])
const fetching = ref(true)
const pending = ref(false)

const searchParams = ref({
  page: 1,
  length: 35,
  keyword: ''
})

// 搜尋
const search = (kw) => {
  searchParams.value.keyword = kw
  searchParams.value.page = 1 // 回到第一頁
}

// 切換length
watch(
  () => searchParams.value.length,
  () => {
    searchParams.value.page = 1 // 回到第一頁
  }
)

// 刪除變數
const showDeleteModal = ref(false)
const deletePending = ref(false)
const selectedId = ref(null)

// 點擊刪除按鈕
const handleDeleteClick = (id) => {
  selectedId.value = id
  showDeleteModal.value = true
}

// 確認刪除
const handleConfirmDelete = async () => {
  try {
    deletePending.value = true
    await deleteUsers(selectedId.value)
    successMsg('刪除成功！')
    // 重新獲取列表數據
    data.value = data.value.filter((item) => item.id !== selectedId.value)
  } catch (error) {
    errorMsg('刪除失敗')
  } finally {
    deletePending.value = false
    showDeleteModal.value = false
    selectedId.value = null
  }
}

// 修改狀態
const handleChange = useDebounceFn(async (value, id) => {
  if (pending.value) return

  const userData = data.value.find((item) => item.id === id)

  if (user.value?.id === id) {
    userData.status = !value
    errorMsg('無法修改自己的帳號狀態！')

    return
  }

  try {
    pending.value = true
    await userStatus(id, { status: value })
    successMsg(`已修改 ${userData.name} 的狀態`)
  } catch (error) {
    userData.status = !value
    errorMsg('狀態修改失敗！')
  } finally {
    pending.value = false
  }
}, 300)

// 監聽 searchParams 的變化
watch(
  searchParams,
  async () => {
    await fetchData()
  },
  { immediate: true, deep: true }
)

async function fetchData() {
  if (pending.value) return

  try {
    pending.value = true
    const res = await getUsers(searchParams.value)
    data.value = res?.data?.data || []
    itemCount.value = res?.data?.count || 0
  } catch (error) {
    data.value = []
    itemCount.value = 0
  } finally {
    fetching.value = false
    pending.value = false
  }
}
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="index" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="user-list-block block">
      <h3 class="page-title">帳號管理</h3>

      <!-- 搜尋框 -->
      <SearchComponent @search="search" />

      <!-- 排序、新增按鈕 -->
      <BtnCreate name="UsersCreate"></BtnCreate>

      <!-- head -->
      <div class="users-list-header users-grid sticky-header row-item">
        <p>姓名/群組</p>
        <p>帳號/Email</p>
        <p class="center">狀態</p>
        <p class="center">驗證狀態</p>
        <p class="center">最後登入</p>
        <p class="center">操作</p>
      </div>

      <!-- 列表 -->
      <ItemSkeleton v-if="fetching" />

      <NSpin v-else :show="pending" size="medium" stroke="4a90e2">
        <ul v-if="data.length" class="users-list" v-auto-animate>
          <li v-for="item in data" :key="`user${item.id}`" class="users-item users-grid row-item">
            <!-- 姓名/群組 -->
            <div class="item">
              {{ item.name }}
              <span class="text">{{ item.user_group }}</span>
            </div>
            <!-- 帳號/Email -->
            <div class="item">
              {{ item.account }}
              <span class="text">{{ item.email }}</span>
            </div>
            <!-- 狀態 -->
            <div class="center item">
              <NSwitch
                v-model:value="item.status"
                size="small"
                :round="false"
                :rail-style="railStyle"
                @update:value="(value) => handleChange(value, item.id)"
              />
            </div>
            <!-- 驗證狀態 -->
            <div class="center item">
              <span class="signal" :class="{ off: !item.is_email_verified }"></span>
            </div>
            <!-- 最後登入 -->
            <div class="center item">
              <time>{{ item.last_login_at || '-' }}</time>
            </div>
            <!-- 操作 -->
            <div class="operate item">
              <RouterLink :to="{ name: 'UsersEdit', params: { id: item.id } }">編輯</RouterLink>
              <button type="button" class="del" @click="handleDeleteClick(item.id)">刪除</button>
            </div>
          </li>
        </ul>
      </NSpin>

      <div class="pagination">
        <NPagination
          v-model:page="searchParams.page"
          :item-count="itemCount"
          :page-slot="8"
          v-model:page-size="searchParams.length"
          :page-sizes="[35, 40, 50]"
          show-size-picker
        />
      </div>
    </section>

    <DeleteModal
      v-model:show="showDeleteModal"
      :loading="deletePending"
      @confirm="handleConfirmDelete"
    />
  </main>
</template>

<style lang="scss" scoped>
.user-list-block {
  position: relative;
}

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

    .text {
      display: block;
      font-size: 0.75rem;
      opacity: 0.6;
      margin-top: 2px;
    }
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
  grid-template-columns: 1fr 1fr 100px 100px 200px 150px;
  align-items: center;
  column-gap: 5px;
  line-height: 1.5;

  .center {
    text-align: center;
  }
}
</style>
