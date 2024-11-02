<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NSpin, NForm, NFormItem, NInput, NSwitch } from 'naive-ui'
import { getRolesEdit, getRole, editRoles } from '@/api/api'
import { successMsg } from '@/composables/useMessage'

import cloneDeep from 'lodash-es/cloneDeep'
import isEqual from 'lodash-es/isEqual'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import ItemSkeleton from '@/components/Skeleton/ItemSkeleton.vue'
import BtnsSubmit from '@/components/Btn/BtnsSubmit.vue'
import permissionTableData from '@/utils/permissionTableData'
import railStyle from '@/utils/railStyle'

const breadcrumbList = [{ title: '角色管理', name: 'Role' }, { title: '編輯' }]

const route = useRoute()
const router = useRouter()
const { id } = route.params
const data = ref([])
const fetching = ref(true)
const pending = ref(false)
// formRef
const formRef = ref(null)
// originValue
const originValue = ref({
  name: '',
  permissions: {}
})
// formValue
const formValue = ref({})
// rules
const rules = {
  name: {
    required: true,
    message: '請輸入角色名稱',
    trigger: ['input', 'blur']
  }
}

// 獲取資料
const fetchData = async () => {
  fetching.value = true

  try {
    const [permissionData, roleData] = await Promise.all([getRolesEdit(id), getRole(id)])

    data.value = permissionData?.data?.actions || []

    if (data.value) {
      originValue.value.name = roleData.data.name
      data.value.forEach((item) => {
        originValue.value.permissions[item.id] = permissionTableData(
          item,
          roleData.data.permissions
        )
      })

      formValue.value = cloneDeep(originValue.value)
    }
  } catch (error) {
    if (error.status == 404) {
      return router.push({ name: 'Role' })
    }
  } finally {
    fetching.value = false
  }
}

const handleEdit = async (data) => {
  try {
    pending.value = true
    await editRoles(id, data)
  } finally {
    reset()
    pending.value = false
  }
}

const submit = () => {
  if (pending.value) return

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await handleEdit(formValue.value)
      await router.push({ name: 'Role' })
      successMsg('修改成功！')
    } else {
      scrollAndFocusToError(errors)
    }
  })
}

function scrollAndFocusToError(errors) {
  const target = document.querySelector(`.setting-form .${errors[0][0]?.field} input`)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => target.focus(), 100)
  }
}

function reset() {
  formValue.value = cloneDeep(originValue.value)
  formRef.value?.restoreValidation()
}

const isChange = computed(() => isEqual(formValue.value, originValue.value))

onMounted(() => {
  fetchData()
})
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="Role" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="role-content block">
      <h3 class="page-title">編輯角色權限</h3>

      <div class="form-content">
        <NSpin :show="pending" size="large" stroke="4a90e2">
          <div class="load" :class="{ loading: fetching }">
            <NForm
              ref="formRef"
              class="setting-form"
              inline
              :model="formValue"
              :rules="rules"
              size="large"
            >
              <div class="column-2">
                <NFormItem label="角色名稱" class="name form-item" path="name">
                  <NInput v-model:value="formValue.name" placeholder="角色名稱" />
                </NFormItem>
              </div>

              <ul class="permission-table">
                <li class="head permission-item sticky-header row-item">
                  <div class="">權限名稱</div>
                  <div class="center">瀏覽</div>
                  <div class="center">新增</div>
                  <div class="center">編輯</div>
                  <div class="center">刪除</div>
                </li>

                <ItemSkeleton v-if="fetching" />

                <template v-else-if="data.length > 0">
                  <li
                    v-for="item in data"
                    :key="`rolePermission${item.id}`"
                    class="permission-item row-item"
                  >
                    <div class="">{{ item.name }}</div>
                    <!-- 瀏覽 -->
                    <div class="center">
                      <NSwitch
                        v-if="item.action.read"
                        v-model:value="formValue.permissions[item.id].read"
                        size="small"
                        :round="false"
                        :rail-style="railStyle"
                      />
                    </div>
                    <!-- 新增 -->
                    <div class="center">
                      <NSwitch
                        v-if="item.action.create"
                        v-model:value="formValue.permissions[item.id].create"
                        size="small"
                        :round="false"
                        :rail-style="railStyle"
                      />
                    </div>
                    <!-- 編輯 -->
                    <div class="center">
                      <NSwitch
                        v-if="item.action.update"
                        v-model:value="formValue.permissions[item.id].update"
                        size="small"
                        :round="false"
                        :rail-style="railStyle"
                      />
                    </div>
                    <!-- 刪除 -->
                    <div class="center">
                      <NSwitch
                        v-if="item.action.delete"
                        v-model:value="formValue.permissions[item.id].delete"
                        size="small"
                        :round="false"
                        :rail-style="railStyle"
                      />
                    </div>
                  </li>
                </template>
              </ul>
            </NForm>
          </div>

          <BtnsSubmit
            :reset-state="isChange"
            :submit-state="isChange"
            @reset="reset"
            @submit="submit"
            show-reset
          />
        </NSpin>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.permission-table {
  width: 100%;
}

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

.load {
  transition: 0.3s ease;

  &.loading {
    filter: blur(2px);
  }
}

.column-2 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  column-gap: 50px;

  @include sm {
    grid-template-columns: 1fr;
  }
}
</style>
