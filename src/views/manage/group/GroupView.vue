<script setup>
import { ref, watch } from 'vue'
import { NSpin, NPagination } from 'naive-ui'
import { getGroups, deleteGroups } from '@/api/api'
import { successMsg, errorMsg } from '@/composables/useMessage'

import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnCreate from '@/components/Btn/BtnCreate.vue'
import SearchComponent from '@/components/Search/SearchComponent.vue'
import ItemSkeleton from '@/components/Skeleton/ItemSkeleton.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'

// 分頁
const itemCount = ref(0) // 總筆數

const breadcrumbList = [{ title: '群組管理' }]
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
    await deleteGroups(selectedId.value)
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
    const res = await getGroups(searchParams.value)
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

    <section class="role-list-block block">
      <h3 class="page-title">群組管理</h3>

      <!-- 搜尋框 -->
      <SearchComponent @search="search" />

      <!-- 排序、新增按鈕 -->
      <BtnCreate name="GroupCreate"></BtnCreate>

      <!-- head -->
      <div class="role-list-header sticky-header sticky-header row-item role-grid">
        <p class="">名稱</p>
        <p class="center">狀態</p>
        <p class="center">等級</p>
        <p class="center">排序</p>
        <p class="center">修改日期</p>
        <p class="center">操作</p>
      </div>

      <!-- 列表 -->
      <ItemSkeleton v-if="fetching" />

      <NSpin v-else :show="pending" size="medium" stroke="4a90e2">
        <ul v-if="data.length" class="role-list" v-auto-animate>
          <li v-for="item in data" :key="`group${item.id}`" class="row-item role-grid">
            <!-- 名稱 -->
            <div class="item">
              <span>{{ item.name }}</span>
            </div>
            <!-- 狀態 -->
            <div class="center item">
              <span class="signal" :class="{ off: !item.status }"></span>
            </div>
            <!-- 等級 -->
            <div class="center item">
              <span>{{ item.level }}</span>
            </div>
            <!-- 排序 -->
            <div class="center item">
              <span>{{ item.sort }}</span>
            </div>
            <!-- 修改日期 -->
            <div class="center item">
              <time>{{ item.updated_at }}</time>
            </div>
            <!-- 操作 -->
            <div class="operate item">
              <RouterLink :to="{ name: 'GroupEdit', params: { id: item.id } }">編輯</RouterLink>
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
.role-list-block {
  position: relative;
}

.role-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 10px;
}

.role-list {
  letter-spacing: 0.05em;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.role-grid {
  display: grid;
  grid-template-columns: 1fr repeat(3, 100px) 200px 150px;
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
  }
}
</style>
