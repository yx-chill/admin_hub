<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { NSpin, NImageGroup, NImage, NSwitch, NPagination } from 'naive-ui'
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

const breadcrumbList = [{ title: 'Banner維護' }]
const route = useRoute()
const { subject } = route.meta.ability
const useAuth = useAuthStore()
const { ability } = storeToRefs(useAuth)
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

  const changeData = data.value.find((item) => item.id === id)

  try {
    pending.value = true
    await userStatus(id, { status: value })
    successMsg(`已修改 ${changeData.name} 的狀態`)
  } catch (error) {
    changeData.status = !value
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

    <section class="block">
      <h3 class="page-title">Banner維護</h3>

      <!-- 搜尋框 -->
      <SearchComponent @search="search" />

      <!-- 排序、新增按鈕 -->
      <BtnCreate v-if="ability.can('create', subject)" name="UsersCreate"></BtnCreate>

      <!-- head -->
      <div class="banner-list-header sticky-header row-item banner-grid">
        <p class="">頁面</p>
        <p class="center">圖片</p>
        <p class="center">狀態</p>
        <p class="center">更新日期</p>
        <p class="center">操作</p>
      </div>

      <!-- 列表 -->
      <ItemSkeleton v-if="fetching" />

      <NSpin v-else :show="pending" size="medium" stroke="4a90e2">
        <NImageGroup>
          <ul v-if="data.length" class="banner-list" v-auto-animate>
            <li v-for="(item, i) in data" :key="`user${item.id}`" class="banner-grid row-item">
              <!-- 頁面 -->
              <div class="item">
                <span>關於我們</span>
              </div>
              <!-- 圖片 -->
              <div class="item center">
                <div class="img">
                  <NImage width="180" :src="`https://picsum.photos/id/23${i}/1920/700`" laze />
                </div>
              </div>
              <!-- 狀態 -->
              <div class="item center">
                <NSwitch
                  v-model:value="item.status"
                  size="small"
                  :round="false"
                  :rail-style="railStyle"
                  :disabled="ability.cannot('delete', subject)"
                  @update:value="(value) => handleChange(value, item.id)"
                />
              </div>
              <!-- 更新日期 -->
              <div class="item center">
                <time>2024-11-05 21:40:18</time>
              </div>
              <!-- 操作 -->
              <div class="operate item">
                <RouterLink
                  v-if="ability.can('update', subject)"
                  :to="{ name: 'UsersEdit', params: { id: item.id } }"
                >
                  編輯
                </RouterLink>
                <button
                  v-if="ability.can('delete', subject)"
                  type="button"
                  class="del"
                  @click="handleDeleteClick(item.id)"
                >
                  刪除
                </button>
              </div>
            </li>
          </ul>
        </NImageGroup>
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

<style lang="css" scoped>
.block {
  position: relative;
}

.banner-list-header {
  margin-bottom: 10px;
}

.banner-list {
  letter-spacing: 0.05em;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.banner-grid {
  display: grid;
  grid-template-columns: 0.8fr 1fr 100px 200px 150px;
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
  }
}
</style>
