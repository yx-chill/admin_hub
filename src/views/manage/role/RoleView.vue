<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { NSpin } from 'naive-ui'
import { getRoles, deleteRoles, sortRoles } from '@/api/api'
import { getUser } from '@/api/auth'
import { Icon } from '@iconify/vue'
import { successMsg, errorMsg } from '@/composables/useMessage'

import cloneDeep from 'lodash-es/cloneDeep'
import draggable from 'vuedraggable'
import ItemSkeleton from '@/components/Skeleton/ItemSkeleton.vue'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnCreate from '@/components/Btn/BtnCreate.vue'
import DeleteModal from '@/components/Modal/DeleteModal.vue'

const breadcrumbList = [{ title: '角色管理' }]
const route = useRoute()
const { subject } = route.meta.ability
const authStore = useAuthStore()
const { ability } = storeToRefs(authStore)
const originData = ref([])
const data = ref([])
const pending = ref(true)
// 刪除變數
const showDeleteModal = ref(false)
const deletePending = ref(false)
const selectedId = ref(null)
// 排序
const canSort = ref(false)
const sortPending = ref(false)

async function fetchData() {
  try {
    const res = await getRoles()
    originData.value = res?.data || []
  } finally {
    pending.value = false
    data.value = cloneDeep(originData.value)
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
    originData.value = originData.value.filter((item) => item.id !== selectedId.value)

    data.value = cloneDeep(originData.value)
    // 更新權限
    const userData = await getUser()
    authStore.setUser(userData.data)
  } catch (error) {
    errorMsg('刪除失敗')
  } finally {
    deletePending.value = false
    showDeleteModal.value = false
    selectedId.value = null
  }
}

// 儲存排序
const svaeSort = async () => {
  sortPending.value = true
  const ids = data.value.map((item) => item.id)

  try {
    await sortRoles({ ids })
    successMsg('儲存成功！')
  } finally {
    canSort.value = false
    sortPending.value = false
  }
}
// 取消排序
const cancelSort = () => {
  canSort.value = false
  data.value = cloneDeep(originData.value)
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
      <h3 class="page-title">角色管理</h3>

      <BtnCreate v-if="ability.can('create', subject)" name="RoleCreate">
        <button type="button" class="btn-sort" :disabled="canSort" @click="canSort = !canSort">
          <Icon icon="hugeicons:sort-by-down-01" />
        </button>
      </BtnCreate>

      <div
        class="role-list-header sticky-header sticky-header row-item"
        :class="{ 'role-grid': !canSort }"
      >
        <template v-if="canSort">
          <p>拖曳項目即可排序</p>

          <div class="operate sort">
            <button type="button" class="del" @click="cancelSort">取消排序</button>
            <button type="button" @click="svaeSort">儲存排序</button>
          </div>
        </template>
        <template v-else>
          <p class="">名稱</p>
          <p class="center">修改日期</p>
          <p class="center">操作</p>
        </template>
      </div>

      <ItemSkeleton v-if="pending" />

      <NSpin v-else :show="sortPending" size="medium" stroke="4a90e2">
        <template v-if="data.length">
          <!-- 排序列表 -->
          <draggable
            v-if="canSort"
            v-model="data"
            tag="ul"
            item-key="id"
            class="role-list sort-list"
            animation="300"
          >
            <template #item="{ element: item }">
              <li class="row-item sort-item">
                <div class="item">
                  <Icon icon="icon-park-outline:drag" />
                </div>
                <div class="item">
                  <span>{{ item.name }}</span>
                </div>
              </li>
            </template>
          </draggable>
          <!-- 一般列表 -->
          <ul v-else class="role-list" v-auto-animate>
            <li v-for="item in data" :key="`role${item.id}`" class="row-item role-grid">
              <div class="item">
                <span>{{ item.name }}</span>
              </div>

              <div class="center item">
                <time>{{ item.updated_at }}</time>
              </div>

              <div class="operate item">
                <RouterLink
                  v-if="ability.can('update', subject)"
                  :to="{ name: 'RoleEdit', params: { id: item.id } }"
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
        </template>
      </NSpin>
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
  grid-template-columns: 1fr 200px 150px;
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
  }
}
</style>
