<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin, NForm, NFormItem, NInput, NInputNumber, NSwitch, NSelect } from 'naive-ui'

import { getGroupCreate, createGroup } from '@/api/api'
import { successMsg } from '@/composables/useMessage'

import cloneDeep from 'lodash-es/cloneDeep'
import isEqual from 'lodash-es/isEqual'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnsSubmit from '@/components/Btn/BtnsSubmit.vue'
import railStyle from '@/utils/railStyle'

const breadcrumbList = [{ title: '群組管理', name: 'Group' }, { title: '新增' }]

const data = ref([])
const router = useRouter()
const fetching = ref(true)
const pending = ref(false)
// formRef
const formRef = ref(null)
// originValue
const originValue = ref({
  name: '',
  status: false,
  level: 0,
  sort: 0,
  roles: null
})
// formValue
const formValue = ref(cloneDeep(originValue.value))
// rules
const rules = {
  name: {
    required: true,
    message: '請輸入群組名稱',
    trigger: ['input', 'blur']
  },
  level: {
    type: 'number',
    required: true,
    message: '等級不能為空',
    trigger: ['change', 'blur']
  },
  sort: {
    type: 'number',
    required: true,
    message: '排序不能為空',
    trigger: ['change', 'blur']
  },
  roles: {
    type: 'array',
    required: true,
    message: '請選擇群組角色',
    trigger: ['blur', 'change']
  }
}

async function fetchData() {
  try {
    fetching.value = true
    const res = await getGroupCreate()
    data.value = res?.data || {}

    originValue.value.level = data.value.level
    formValue.value.level = data.value.level
  } finally {
    fetching.value = false
  }
}

const handleCreate = async (data) => {
  try {
    pending.value = true
    await createGroup(data)
  } finally {
    reset()
    pending.value = false
  }
}

const submit = () => {
  if (pending.value) return

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      await handleCreate(formValue.value)
      await router.push({ name: 'Group' })
      successMsg('新增成功！')
    } else {
      scrollAndFocusToError(errors)
    }
  })
}

function scrollAndFocusToError(errors) {
  const target = document.querySelector(
    `.setting-form .${errors[0][0]?.field} input, .setting-form .${errors[0][0]?.field} .n-base-selection-tags`
  )

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
      <BtnBack name="Group" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="group-list-block block">
      <h3 class="page-title">新增群組</h3>

      <div class="form-content">
        <NSpin :show="pending" size="medium" stroke="4a90e2">
          <NForm
            ref="formRef"
            class="setting-form"
            inline
            :model="formValue"
            :rules="rules"
            size="large"
          >
            <!-- 狀態 -->
            <NFormItem label="狀態" class="status form-item" path="status">
              <NSwitch
                v-model:value="formValue.status"
                size="small"
                :round="false"
                :rail-style="railStyle"
              />
            </NFormItem>

            <div class="column-3">
              <!-- 名稱 -->
              <NFormItem label="群組名稱" class="name form-item" path="name">
                <NInput v-model:value="formValue.name" placeholder="群組名稱" />
              </NFormItem>
              <!-- 等級 -->
              <NFormItem label="等級" class="level form-item" path="level">
                <NInputNumber
                  v-model:value="formValue.level"
                  placeholder="等級"
                  :min="data.level"
                  clearable
                />
              </NFormItem>
              <!-- 排序 -->
              <NFormItem label="排序" class="sort form-item" path="sort">
                <NInputNumber
                  v-model:value="formValue.sort"
                  placeholder="排序"
                  :min="0"
                  clearable
                />
              </NFormItem>
            </div>

            <!-- 選擇角色 -->
            <NFormItem label="選擇角色" class="roles form-item" path="roles">
              <NSelect
                v-model:value="formValue.roles"
                multiple
                :options="data.roles"
                placeholder="選擇角色"
              />
            </NFormItem>
          </NForm>

          <BtnsSubmit :reset-state="isChange" @reset="reset" @submit="submit" show-reset />
        </NSpin>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.group-list-block {
  position: relative;
}

.column-3 {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: flex-start;
  column-gap: 50px;
}
</style>
