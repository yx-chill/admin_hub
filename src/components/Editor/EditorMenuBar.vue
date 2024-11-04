<script setup>
import { inject, computed, ref } from 'vue'
import { NSelect } from 'naive-ui'
import { Icon } from '@iconify/vue'

import EditorMenuItem from './EditorMenuItem.vue'
import EditorMenuLink from './EditorMenuLink.vue'
import EditorMenuImage from './EditorMenuImage.vue'

const editor = inject('editor')
const showHtmlCode = inject('showHtmlCode')
const htmlContent = inject('htmlContent')
const isEditable = ref(true)
// 字體大小選項
const fontSizes = [
  { label: '12px', value: '0.75rem' },
  { label: '14px', value: '0.875rem' },
  { label: '16px', value: '1rem' },
  { label: '18px', value: '1.125rem' },
  { label: '20px', value: '1.25rem' },
  { label: '24px', value: '1.5rem' },
  { label: '28px', value: '1.75rem' },
  { label: '32px', value: '2rem' },
  { label: '36px', value: '2.25rem' },
  { label: '48px', value: '3rem' },
  { label: '60px', value: '3.75rem' },
  { label: '72px', value: '4.5rem' }
]
const selectedFontSize = ref('1rem')
const handleUpdateFontSize = (size) => {
  editor.value.chain().focus().setFontSize(size).run()
}

// 監聽不同段落的選擇變更事件
editor.value?.on('selectionUpdate', ({ editor }) => {
  const currentFontSize = editor.getAttributes('textStyle').fontSize || '1rem'
  selectedFontSize.value = currentFontSize
})

const items = computed(() => {
  if (!editor.value) return []

  return [
    {
      type: 'bold',
      icon: 'ri:bold',
      title: '粗體',
      action: () => editor.value.chain().focus().toggleBold().run(),
      isActive: () => editor.value.isActive('bold')
    },
    {
      type: 'italic',
      icon: 'ri:italic',
      title: '斜線',
      action: () => editor.value.chain().focus().toggleItalic().run(),
      isActive: () => editor.value.isActive('italic')
    },
    {
      type: 'underline',
      icon: 'ri:underline',
      title: '底線',
      action: () => editor.value.chain().focus().toggleUnderline().run(),
      isActive: () => editor.value.isActive('underline')
    },
    {
      type: 'strike',
      icon: 'ri:strikethrough',
      title: '刪除線',
      action: () => editor.value.chain().focus().toggleStrike().run(),
      isActive: () => editor.value.isActive('strike')
    },
    {
      type: 'highlight',
      icon: 'ri:mark-pen-line',
      title: 'highlight',
      action: () => editor.value.chain().focus().toggleHighlight().run(),
      isActive: () => editor.value.isActive('highlight')
    },
    {
      type: 'link',
      icon: 'ri:link',
      title: '連結',
      action: (url) => {
        if (typeof url === 'string') {
          // 設定連結
          editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        } else if (editor.value.isActive('link')) {
          // 取消連結
          editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
        }
      },
      isActive: () => editor.value.isActive('link')
    },
    {
      type: 'image',
      icon: 'ri:image-line',
      title: '圖片',
      action: (url) => editor.value.chain().focus().setImage({ src: url }).run()
    },
    {
      type: 'divider'
    },
    {
      type: 'h1',
      icon: 'ri:h-1',
      title: '標題1',
      action: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.value.isActive('heading', { level: 1 })
    },
    {
      type: 'h2',
      icon: 'ri:h-2',
      title: '標題2',
      action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.value.isActive('heading', { level: 2 })
    },
    {
      type: 'h3',
      icon: 'ri:h-3',
      title: '標題3',
      action: () => editor.value.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.value.isActive('heading', { level: 3 })
    },
    {
      type: 'h4',
      icon: 'ri:h-4',
      title: '標題4',
      action: () => editor.value.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: () => editor.value.isActive('heading', { level: 4 })
    },
    {
      type: 'h5',
      icon: 'ri:h-5',
      title: '標題5',
      action: () => editor.value.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: () => editor.value.isActive('heading', { level: 5 })
    },
    {
      type: 'h6',
      icon: 'ri:h-6',
      title: '標題6',
      action: () => editor.value.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: () => editor.value.isActive('heading', { level: 6 })
    },
    {
      type: 'divider'
    },
    {
      type: 'paragraph',
      icon: 'ri:paragraph',
      title: '文字',
      action: () => editor.value.chain().focus().setParagraph().run(),
      isActive: () => editor.value.isActive('paragraph')
    },
    {
      type: 'bulletList',
      icon: 'ri:list-unordered',
      title: '無序列表',
      action: () => editor.value.chain().focus().toggleBulletList().run(),
      isActive: () => editor.value.isActive('bulletList')
    },
    {
      type: 'orderedList',
      icon: 'ri:list-ordered',
      title: '有序列表',
      action: () => editor.value.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.value.isActive('orderedList')
    },
    {
      type: 'divider'
    },
    {
      type: 'blockquote',
      icon: 'ri:double-quotes-l',
      title: '註釋區塊',
      action: () => editor.value.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.value.isActive('blockquote')
    },
    {
      type: 'separator',
      icon: 'ri:separator',
      title: '分隔線',
      action: () => editor.value.chain().focus().setHorizontalRule().run()
    },
    {
      type: 'divider'
    },
    {
      type: 'code',
      icon: 'ri:code-line',
      title: 'HTML原始碼',
      action: () => {
        // 切換到 HTML 模式前，確保內容同步
        if (!showHtmlCode.value) {
          htmlContent.value = editor.value.getHTML()
        }
        showHtmlCode.value = !showHtmlCode.value
      },
      isActive: () => showHtmlCode.value
    },
    {
      type: 'preview',
      icon: isEditable.value ? 'ri:eye-line' : 'ri:edit-box-line',
      title: isEditable.value ? '預覽模式' : '編輯模式',
      action: () => {
        isEditable.value = !isEditable.value
        editor.value.setEditable(isEditable.value)
      },
      isActive: () => false
    }
  ]
})
</script>

<template>
  <div class="editor-menu-bar">
    <!-- font size -->
    <div class="fontsize-item">
      <Icon icon="ri:font-size" />
      <NSelect
        class="edit-fontsize"
        v-model:value="selectedFontSize"
        :options="fontSizes"
        @update:value="handleUpdateFontSize"
      />
    </div>

    <!-- 文字顏色 -->
    <input
      type="color"
      class="color-picker"
      title="文字顏色"
      :value="editor.getAttributes('textStyle').color"
      @input="editor.chain().focus().setColor($event.target.value).run()"
    />

    <template v-for="(item, i) in items" :key="`menuItem${i}`">
      <!-- 分隔線 -->
      <div v-if="item.type === 'divider'" class="divider"></div>
      <!-- 連結 -->
      <EditorMenuLink v-else-if="item.type === 'link'" v-bind="item" />
      <!-- 上傳圖片 -->
      <EditorMenuImage v-else-if="item.type === 'image'" v-bind="item" />
      <!-- 其他功能 -->
      <EditorMenuItem v-else v-bind="item" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.editor-menu-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  border-bottom: 1px solid var(--tabs-border-color);
  padding: 8px 12px;
}

.fontsize-item {
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 5px;
    z-index: 1;
    transform: translateY(-50%);
    font-size: 1.125rem;
    color: var(--color-text);
    pointer-events: none;
  }
}

.color-picker {
  width: 28px;
  height: 28px;
  background-color: transparent;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &::-webkit-color-swatch {
    border-radius: 4px;
  }
}

.divider {
  width: 1px;
  height: 20px;
  background-color: #e4e4e7;
  margin: 0 8px;
}
</style>
