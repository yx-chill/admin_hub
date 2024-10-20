<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { NSpin, NModal, NCard } from 'naive-ui'
import { Cropper } from 'vue-advanced-cropper'
import { useStateStore } from '@/stores/state'
import Stencil from './Stencil.vue'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'
import { changeProfile } from '@/api/auth'
import { successMsg, errorMsg } from '@/composables/useMessage'
import 'vue-advanced-cropper/dist/style.css'

const stateStore = useStateStore()
const authStore = useAuthStore()
const { showAvatarCropper } = storeToRefs(stateStore)
const { user } = storeToRefs(authStore)

const image = ref(user.value.avatar)
const cropperRef = ref(null)
const fileInputRef = ref(null)
const croppedImageFile = ref(null)
const pending = ref(false)

const handleChangeProfile = async (data) => {
  try {
    pending.value = true
    const res = await changeProfile(data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    user.value.avatar = res.avatar
    successMsg('上傳成功！')
  } finally {
    image.value = user.value.avatar
    pending.value = false
    showAvatarCropper.value = false
  }
}

const cropImage = () => {
  const result = cropperRef.value.getResult()

  if (!result.canvas) {
    errorMsg('請先上傳頭像圖片')

    return
  }

  // Convert the cropped image to a blob
  result.canvas.toBlob(async (blob) => {
    // Create a new File object from the blob
    const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' })

    // Store the File object in the ref
    croppedImageFile.value = file

    const data = new FormData()
    data.append('_method', 'put')
    data.append('name', user.value.name)
    data.append('avatar', file)

    await handleChangeProfile(data)
  }, 'image/jpeg')
}

const uploadImage = (event) => {
  const input = event.target
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      image.value = e.target.result
    }
    reader.readAsDataURL(input.files[0])
  }
}
</script>

<template>
  <NModal v-model:show="showAvatarCropper">
    <NCard
      style="width: 500px"
      title="頭像設定"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <button type="button" class="btn-close" title="關閉" @click="showAvatarCropper = false">
          <Icon icon="pepicons-print:times" />
        </button>
      </template>

      <div class="upload-example">
        <NSpin :show="pending" size="medium" stroke="4a90e2">
          <cropper
            ref="cropperRef"
            class="upload-example-cropper"
            :src="image"
            :stencil-component="Stencil"
            :stencil-props="{
              aspectRatio: 1 / 1
            }"
          />
        </NSpin>
      </div>
      <template #footer>
        <div class="button-wrapper">
          <span class="button" @click="fileInputRef.click()">
            <input type="file" ref="fileInputRef" @change="uploadImage" accept="image/*" />
            上傳圖片
          </span>
          <span class="button" @click="cropImage">確定</span>
        </div>
      </template>
    </NCard>
  </NModal>
</template>

<style lang="scss" scoped>
.upload-example-cropper {
  width: 300px;
  height: 300px;
  background: var(--color-background);
  box-shadow: var(--block-box-shadow);
  margin: 0 auto;

  :deep(.vue-advanced-cropper__boundaries) {
    width: 100% !important;
    height: 100% !important;
  }
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.button {
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  background: #3fb37f;
  cursor: pointer;
  transition: background 0.5s;
  font-family:
    Open Sans,
    Arial;
  margin: 0 10px;
}

.button:hover {
  background: #38d890;
}

.button input {
  display: none;
}

.btn-close {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.875rem;
  color: var(--color);
  background: var(--color-background);
  border-radius: 50%;
  border: none;
  padding: 0 1px 1px 0;

  &:hover {
    svg {
      transform: rotate(180deg);
    }
  }

  svg {
    transition: 0.5s ease;
  }
}
</style>
