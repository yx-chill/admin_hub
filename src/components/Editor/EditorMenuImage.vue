<script setup>
import { nextTick, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { NTabs, NTabPane } from 'naive-ui'
import { Icon } from '@iconify/vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})

const url = ref('')
const urlEl = ref(null)

const showPopover = ref(false)
const popoverEl = ref(null)

const fileEl = ref(null)

const handleAction = () => {
  showPopover.value = !showPopover.value

  if (!showPopover.value) return

  url.value = ''

  onClickOutside(popoverEl, () => {
    showPopover.value = false
  })

  nextTick(() => {
    urlEl.value.focus()
  })
}

const handleSubmit = () => {
  if (!showPopover.value) return
  if (url.value) {
    props.action(url.value)
  }

  showPopover.value = false
}

const selectFile = () => {
  fileEl.value.click()
}

const onChangeFile = () => {
  const [file] = fileEl.value.files
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    // const dataUrl =  reader.result
    props.action(reader.result)
    showPopover.value = false
  }
}
</script>

<template>
  <div class="relative">
    <button
      class="btn-editor-item"
      :class="{ active: showPopover }"
      :title="title"
      @click="handleAction"
    >
      <Icon :icon="icon" />
    </button>

    <div v-if="showPopover" ref="popoverEl" class="image-popover" @keyup.esc="showPopover = false">
      <NTabs type="line" class="image-tabs" default-value="link" size="small" animated>
        <NTabPane name="link" tab="連結">
          <div class="link-container">
            <input
              type="text"
              placeholder="圖片連結..."
              class="form-input text-sm px-2 py-1"
              @keyup.enter="handleSubmit"
              v-model="url"
              ref="urlEl"
            />
            <button
              type="button"
              title="插入連結"
              class="ml-1 flex-shrink-0 w-7 h-7 p-1 hover:bg-violet-600 hover:text-white rounded"
              @click="handleSubmit"
            >
              <Icon icon="ri:check-line" />
            </button>
          </div>
        </NTabPane>

        <NTabPane name="upload" tab="上傳圖片">
          <div class="upload-container">
            <button type="button" class="" @click="selectFile">
              <Icon icon="ri:upload-cloud-2-line" />
              選擇圖片
            </button>
          </div>
        </NTabPane>
      </NTabs>
      <!-- 檔案input -->
      <input ref="fileEl" type="file" accept="image/*" class="hidden" @change="onChangeFile" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.relative {
  position: relative;
  width: 28px;
  height: 28px;
}

.image-popover {
  position: absolute;
  top: 100%;
  width: 300px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--color-reverse-base);
  border-radius: 4px;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-shadow);
  border: 1px solid var(--blockquote-border);
  padding: 0.5rem;
}

.link-container {
  display: flex;
  align-items: center;
  gap: 4px;

  input {
    flex: 1;
    height: 26px;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    color: var(--color-text);
    background: var(--block-color-background-o9);
    border-radius: 3px;
    border: 1px solid var(--blockquote-border);
    padding: 4px 5px 2px;
    outline: none;
  }

  a,
  button {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 3px;
    border: none;
    padding: 4px;
    transition: 0.3s ease;

    &:hover {
      background: var(--color);

      svg {
        color: #fff;
      }
    }

    svg {
      width: 100%;
      height: 100%;
      color: var(--color-base);
      transition: 0.3s ease;
    }
  }
}

.upload-container {
  button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    color: #fff;
    background-color: var(--color);
    border-radius: 4px;
    border: none;
    padding: 4px;
    opacity: 0.9;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }

    svg {
      font-size: 1rem;
      transform: translateY(1px);
    }
  }
}
</style>
