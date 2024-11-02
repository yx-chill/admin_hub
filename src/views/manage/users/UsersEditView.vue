<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { NSpin, NForm, NFormItem, NInput, NSelect, NSwitch } from 'naive-ui'
import { getUsersEdit, getUser, editUser } from '@/api/api.js'
import { successMsg } from '@/composables/useMessage'

import cloneDeep from 'lodash-es/cloneDeep'
import isEqual from 'lodash-es/isEqual'
import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnsSubmit from '@/components/Btn/BtnsSubmit.vue'
import railStyle from '@/utils/railStyle'

const breadcrumbList = [{ title: '帳號管理', name: 'Users' }, { title: '編輯' }]

const route = useRoute()
const router = useRouter()
const { id } = route.params
const useAuth = useAuthStore()
const { user } = storeToRefs(useAuth)
const data = ref([])
const canSwitchStatus = ref(true)
const fetching = ref(true)
const pending = ref(false)
// formRef
const formRef = ref(null)
// originValue
const originValue = ref({
  status: false,
  account: '',
  name: '',
  email: '',
  user_group_id: null
})
// formValue
const formValue = ref({})
// rules
const rules = {
  account: {
    required: true,
    message: '請輸入帳號',
    trigger: ['input', 'blur']
  },
  name: {
    required: true,
    message: '請輸入姓名',
    trigger: ['input', 'blur']
  },
  email: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error('請輸入Email')
      } else if (!/^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
        return new Error('Email格式錯誤')
      }
    },
    trigger: ['change', 'blur']
  },
  user_group_id: {
    type: 'number',
    required: true,
    message: '請選擇群組',
    trigger: ['blur', 'change']
  }
}

async function fetchData() {
  try {
    fetching.value = true
    const [rolesData, userData] = await Promise.all([getUsersEdit(id), getUser(id)])

    Object.keys(originValue.value).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(userData.data, key)) {
        originValue.value[key] = userData.data[key]
      }
    })

    if (user.value?.id === userData.data?.id) {
      canSwitchStatus.value = false
    }

    data.value = rolesData.data || {}
    formValue.value = cloneDeep(originValue.value)
  } finally {
    fetching.value = false
  }
}

const handleEdit = async (data) => {
  try {
    pending.value = true
    await editUser(id, data)
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
      await router.push({ name: 'Users' })
      successMsg('修改成功！')
    } else {
      scrollAndFocusToError(errors)
    }
  })
}

function scrollAndFocusToError(errors) {
  const target = document.querySelector(
    `.setting-form .${errors[0][0]?.field} input, .setting-form .${errors[0][0]?.field} .n-base-selection-label`
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
      <BtnBack name="Users" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="user-list-block block">
      <h3 class="page-title">編輯帳號</h3>

      <NSpin :show="pending" size="medium" stroke="4a90e2">
        <div class="load" :class="{ loading: fetching }">
          <NForm
            ref="formRef"
            class="setting-form register-form"
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
                :disabled="!canSwitchStatus"
              />
            </NFormItem>

            <div class="column-2">
              <NFormItem label="帳號" class="account form-item" path="account">
                <NInput v-model:value="formValue.account" placeholder="Account" disabled />
              </NFormItem>

              <NFormItem label="姓名" class="name form-item" path="name">
                <NInput v-model:value="formValue.name" placeholder="Name" />
              </NFormItem>
            </div>

            <div class="column-2">
              <NFormItem label="Email" class="email form-item" path="email">
                <NInput v-model:value="formValue.email" placeholder="Email" disabled />
              </NFormItem>

              <NFormItem label="群組" class="user_group_id form-item" path="user_group_id">
                <NSelect
                  class="round"
                  v-model:value="formValue.user_group_id"
                  :options="data.user_groups"
                  placeholder="請選擇"
                  clearable
                />
              </NFormItem>
            </div>
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
    </section>
  </main>
</template>

<style lang="scss" scoped>
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
}
</style>
