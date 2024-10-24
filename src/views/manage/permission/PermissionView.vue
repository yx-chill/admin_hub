<script setup>
import { onMounted, ref } from 'vue'
import { getPermissions, deletePermissions } from '@/api/api'
import { successMsg, errorMsg } from '@/composables/useMessage'

import ItemSkeleton from '@/components/Skeleton/ItemSkeleton.vue'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnCreate from '@/components/Btn/BtnCreate.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'

const breadcrumbList = [{ title: '權限管理' }]
const data = ref([])
const pending = ref(true)
// 刪除變數
const showDeleteModal = ref(false)
const deletePending = ref(false)
const selectedId = ref(null)

async function fetchData() {
  try {
    const res = await getPermissions()
    data.value = res?.data || []
  } finally {
    pending.value = false
  }
}

// 點擊刪除按鈕
const handleDeleteClick = (id) => {
  selectedId.value = id
  showDeleteModal.value = true
}

// 確認刪除
const handleConfirmDelete = async () => {
  try {
    deletePending.value = true
    await deletePermissions(selectedId.value)
    successMsg('刪除成功！')
    // 重新獲取列表數據
    data.value = data.value.filter((item) => item.id !== selectedId.value)
    // await fetchList()
  } catch (error) {
    errorMsg('刪除失敗')
  } finally {
    deletePending.value = false
    showDeleteModal.value = false
    selectedId.value = null
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="index" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="permission-list-block block">
      <h3 class="page-title">權限管理</h3>

      <BtnCreate name="PermissionCreate" />

      <div class="permission-list-header permission-grid sticky-header row-item">
        <p class="">權限名稱</p>
        <p class="">資源名稱</p>
        <p class="center">瀏覽</p>
        <p class="center">新增</p>
        <p class="center">編輯</p>
        <p class="center">刪除</p>
        <p class="center">操作</p>
      </div>

      <ItemSkeleton v-if="pending" />

      <template v-else>
        <ul v-if="data.length" class="permission-list" v-auto-animate>
          <li v-for="item in data" :key="`permissions${item.id}`" class="row-item permission-grid">
            <div class="item">
              <span>{{ item.name }}</span>
            </div>
            <div class="item">
              <span>{{ item.resource }}</span>
            </div>
            <!-- 瀏覽 -->
            <div class="center item">
              <span class="signal" :class="{ off: !item.can_read }"></span>
            </div>
            <!-- 新增 -->
            <div class="center item">
              <span class="signal" :class="{ off: !item.can_create }"></span>
            </div>
            <!-- 編輯 -->
            <div class="center item">
              <span class="signal" :class="{ off: !item.can_update }"></span>
            </div>
            <!-- 刪除 -->
            <div class="center item off">
              <span class="signal" :class="{ off: !item.can_delete }"></span>
            </div>
            <!-- 操作 -->
            <div class="operate item">
              <RouterLink :to="{ name: 'PermissionEdit', params: { id: item.id } }"
                >編輯</RouterLink
              >
              <button type="button" class="del" @click="handleDeleteClick(item.id)">刪除</button>
            </div>
          </li>
        </ul>
      </template>
    </section>

    <DeleteModal
      v-model:show="showDeleteModal"
      :loading="deletePending"
      @confirm="handleConfirmDelete"
    />
  </main>
</template>

<style lang="scss" scoped>
.permission-list-block {
  position: relative;
}

.permission-list-header {
  margin-bottom: 10px;
}

.permission-list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
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
