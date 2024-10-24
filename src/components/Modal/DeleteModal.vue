<script setup>
import { computed } from 'vue'
import { NSpin, NModal, NCard, NSpace } from 'naive-ui'

const props = defineProps({
  // 控制 modal 顯示
  show: {
    type: Boolean,
    required: true
  },
  // 標題
  title: {
    type: String,
    default: '確認刪除'
  },
  // 內容
  content: {
    type: String,
    default: '確定要刪除此項目嗎？此操作無法復原。'
  },
  // 刪除按鈕文字
  deleteButtonText: {
    type: String,
    default: '刪除'
  },
  // 取消按鈕文字
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  // 載入狀態
  loading: {
    type: Boolean,
    default: false
  }
})

// 定義事件
const emit = defineEmits(['update:show', 'confirm', 'cancel'])

// 使用 computed 來處理 modal 的顯示狀態
const modalShow = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

// 關閉 modal
const handleClose = () => {
  emit('update:show', false)
  emit('cancel')
}

// 確認刪除
const handleConfirm = () => {
  emit('confirm')
}
</script>

<template>
  <NModal
    class="delete-modal"
    v-model:show="modalShow"
    preset="dialog"
    :title="title"
    @close="handleClose"
  >
    <NSpin :show="loading" size="medium" stroke="4a90e2">
      <NCard>
        <template #header>
          <div class="text-red-500">{{ content }}</div>
        </template>

        <NSpace justify="end">
          <!-- 取消 -->
          <button type="button" class="btn-cancel button" @click="handleClose">
            {{ cancelButtonText }}
          </button>
          <!-- 刪除 -->
          <button type="button" class="btn-del button" @click="handleConfirm">
            {{ deleteButtonText }}
          </button>
        </NSpace>
      </NCard>
    </NSpin>
  </NModal>
</template>

<style lang="scss" scoped>
.button {
  font-size: 0.9375rem;
  letter-spacing: 0.1em;
  color: var(--color-reverse-base);
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid;
  padding: 0.25rem 0.75rem 0.3rem;

  &.btn-cancel {
    color: var(--color-text);
    border-color: var(--color-text);
  }

  &.btn-del {
    font-weight: 500;
    background-color: var(--red);
    border-color: var(--red);
  }
}
</style>

<style lang="scss">
.delete-modal {
  .n-dialog__title {
    letter-spacing: 0.05em;
    .n-base-icon {
      display: none;
    }
  }

  .n-card {
    border: none;
  }

  .n-card-header {
    letter-spacing: 0.05em;
    .n-card-header__main {
      font-size: 1.0625rem;
      color: var(--red);
    }
  }

  .n-card__content {
    padding-top: 16px;
    padding-bottom: 4px;
  }
}
</style>
