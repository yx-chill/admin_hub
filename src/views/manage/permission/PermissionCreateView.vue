<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin, NForm, NFormItem, NInput, NSwitch } from 'naive-ui'

import { createPermissions } from '@/api/api'
import { successMsg } from '@/composables/useMessage'

import BtnBack from '@/components/Btn/BtnBack.vue'
import BreadcrumbComponents from '@/components/BreadcrumbComponents.vue'
import BtnsSubmit from '@/components/Btn/BtnsSubmit.vue'
import railStyle from '@/utils/railStyle'

const breadcrumbList = [{ title: '權限管理', name: 'Permission' }, { title: '新增' }]

const router = useRouter()
const pending = ref(false)
// formRef
const formRef = ref(null)
// formValue
const formValue = ref({
  name: '',
  resource: '',
  action: {
    create: false,
    read: false,
    update: false,
    delete: false
  }
})
// rules
const rules = {
  name: {
    required: true,
    message: '請輸入權限名稱',
    trigger: ['input', 'blur']
  },
  resource: {
    required: true,
    message: '請輸入資源名稱',
    trigger: ['input', 'blur']
  }
}

const handleCreate = async (data) => {
  pending.value = true

  try {
    await createPermissions(data)
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
      await router.push({ name: 'Permission' })
      successMsg('新增成功！')
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
  formValue.value = {
    name: '',
    resource: '',
    action: {
      create: false,
      read: false,
      update: false,
      delete: false
    }
  }
  formRef.value?.restoreValidation()
}
</script>

<template>
  <main class="main">
    <div class="page-top">
      <BtnBack name="Permission" />
      <BreadcrumbComponents :list="breadcrumbList" />
    </div>

    <section class="permission-list-block block">
      <h3 class="page-title">新增權限</h3>

      <div class="form-content">
        <NSpin :show="pending" size="large" stroke="4a90e2">
          <NForm
            ref="formRef"
            class="setting-form"
            inline
            :model="formValue"
            :rules="rules"
            size="large"
          >
            <div class="column-2">
              <NFormItem label="權限名稱" class="name form-item" path="name">
                <NInput v-model:value="formValue.name" placeholder="權限名稱" />
              </NFormItem>

              <NFormItem label="資源名稱" class="resource form-item" path="resource">
                <NInput v-model:value="formValue.resource" placeholder="資源名稱" />
              </NFormItem>
            </div>

            <div class="permission-header permission-grid row-item">
              <p class="center">瀏覽</p>
              <p class="center">新增</p>
              <p class="center">編輯</p>
              <p class="center">刪除</p>
            </div>

            <div class="row-item permission-grid">
              <div class="center item">
                <NSwitch
                  v-model:value="formValue.action.read"
                  size="small"
                  :round="false"
                  :rail-style="railStyle"
                />
              </div>
              <div class="center item">
                <NSwitch
                  v-model:value="formValue.action.create"
                  size="small"
                  :round="false"
                  :rail-style="railStyle"
                />
              </div>
              <div class="center item">
                <NSwitch
                  v-model:value="formValue.action.update"
                  size="small"
                  :round="false"
                  :rail-style="railStyle"
                />
              </div>
              <div class="center item">
                <NSwitch
                  v-model:value="formValue.action.delete"
                  size="small"
                  :round="false"
                  :rail-style="railStyle"
                />
              </div>
            </div>
          </NForm>

          <BtnsSubmit @reset="reset" @submit="submit" show-reset />
        </NSpin>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.permission-list-block {
  position: relative;
}

.permission-list-header {
  margin-bottom: 10px;
}

.permission-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  column-gap: 5px;

  .center {
    text-align: center;
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
