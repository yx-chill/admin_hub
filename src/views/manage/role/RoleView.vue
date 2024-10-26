<script setup>
import { onMounted, ref } from 'vue'
import { getRoles, deleteRoles } from '@/api/api'
import { successMsg, errorMsg } from '@/composables/useMessage'

import ItemSkeleton from '@/components/Skeleton/ItemSkeleton.vue'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnCreate from '@/components/Btn/BtnCreate.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'

const breadcrumbList = [{ title: '角色管理' }]

const data = ref([])
const pending = ref(true)
// 刪除變數
const showDeleteModal = ref(false)
const deletePending = ref(false)
const selectedId = ref(null)

async function fetchData() {
  try {
    const res = await getRoles()
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
    await deleteRoles(selectedId.value)
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

    <section class="role-list-block block">
      <h3 class="page-title">角色列表</h3>

      <BtnCreate name="RoleCreate" />

      <div class="role-list-header role-grid sticky-header sticky-header row-item">
        <p class="">名稱</p>
        <p class="center">修改日期</p>
        <p class="center">操作</p>
      </div>

      <ItemSkeleton v-if="pending" />

      <template v-else>
        <ul v-if="data.length" class="role-list" v-auto-animate>
          <li v-for="item in data" :key="`role${item.id}`" class="row-item role-grid">
            <div class="item">
              <span>{{ item.name }}</span>
            </div>

            <div class="center item">
              <time>{{ item.updated_at }}</time>
            </div>

            <div class="operate item">
              <RouterLink :to="{ name: 'RoleEdit', params: { id: item.id } }">編輯</RouterLink>
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
.role-list-block {
  position: relative;
}

.role-list-header {
  margin-bottom: 10px;
}

.role-list {
  letter-spacing: 0.05em;
  .row-item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.role-grid {
  display: grid;
  grid-template-columns: 1fr 200px 150px;
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
  }
}
</style>
