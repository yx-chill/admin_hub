<script setup>
import { inject, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
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
  },
  isActive: {
    type: Function,
    default: () => false
  }
})

const editor = inject('editor')
const selectedLinkAttrs = inject('selectedLinkAttrs')

const showPopover = ref(false)
const url = ref('')
const urlEl = ref(null)
const popoverEl = ref(null)

onClickOutside(popoverEl, () => {
  showPopover.value = false
})

// 監聽選中的連結屬性變化
watch(selectedLinkAttrs, (attrs) => {
  if (attrs?.href) {
    url.value = attrs.href
    showPopover.value = true
  }
})

// 監聽連結狀態變化
watch(
  () => props.isActive(),
  (isActive) => {
    if (!isActive) {
      showPopover.value = false
    }
  }
)

const handleAction = () => {
  showPopover.value = !showPopover.value

  if (!showPopover.value) return

  if (props.isActive()) {
    url.value = editor.value.getAttributes('link').href || ''
  } else {
    url.value = ''
    // props.action(url.value)
  }

  setTimeout(() => {
    urlEl.value?.focus()
  })
}

const handleSubmit = () => {
  props.action(url.value)
  showPopover.value = false
}

const handleUnlink = () => {
  props.action(null)
  showPopover.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="btn-editor-item"
      :class="{ active: isActive?.() || showPopover }"
      :title="title"
      @click="handleAction"
    >
      <Icon :icon="icon" />
    </button>

    <div v-if="showPopover" ref="popoverEl" class="link-popover" @keyup.esc="showPopover = false">
      <input
        ref="urlEl"
        v-model="url"
        type="text"
        placeholder="連結..."
        class="form-input text-sm px-2 py-1"
        @keyup.enter="handleSubmit"
      />

      <button type="button" title="插入連結" @click="handleSubmit">
        <Icon icon="ri:check-line" />
      </button>

      <button type="button" title="取消連結" @click="handleUnlink">
        <Icon icon="ri:link-unlink" />
      </button>

      <RouterLink :to="url" title="瀏覽網頁" :target="url?.startsWith('/') ? '_self' : '_blank'">
        <Icon icon="ri:external-link-line" />
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.relative {
  position: relative;
  width: 28px;
  height: 28px;
}

.link-popover {
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
</style>
