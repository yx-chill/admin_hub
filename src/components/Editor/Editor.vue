<script setup>
import { provide, watch, ref } from 'vue'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import FontSize from 'tiptap-extension-font-size'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color'
import createLinkExtension from './Link'

import EditorMenuBar from './EditorMenuBar.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: String,
  memo: String
})

const emit = defineEmits(['update:modelValue'])

const showHtmlCode = ref(false)
const htmlContent = ref(props.modelValue)

// 創建一個 ref 來存儲當前選中的連結屬性
const selectedLinkAttrs = ref(null)

// 提供給子組件使用的方法
const onLinkSelected = (attrs) => {
  selectedLinkAttrs.value = attrs
}

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    TextStyle,
    Color,
    Highlight,
    Underline,
    createLinkExtension(onLinkSelected),
    Image,
    FontSize.configure({
      types: ['textStyle']
    })
  ],
  editorProps: {
    attributes: {
      spellcheck: 'false'
    }
  },
  onUpdate: ({ editor }) => {
    const newContent = editor.getHTML()
    emit('update:modelValue', newContent)
    if (!showHtmlCode.value) {
      htmlContent.value = newContent
    }
  }
})

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value && editor.value.getHTML() !== value) {
      editor.value.commands.setContent(value, false)
    }
  }
)

// 監聽 HTML 原始碼的變化
watch(htmlContent, (newValue) => {
  if (showHtmlCode.value) {
    emit('update:modelValue', newValue)
    if (editor.value) {
      editor.value.commands.setContent(newValue, false)
    }
  }
})

// 提供給 MenuBar 使用的值和方法
provide('editor', editor)
provide('showHtmlCode', showHtmlCode)
provide('htmlContent', htmlContent)
provide('selectedLinkAttrs', selectedLinkAttrs)
</script>

<template>
  <div class="editor-wrapper">
    <p v-if="props.label" class="editor-title">
      {{ props.label }}
      <span v-if="props.memo">{{ props.memo }}</span>
    </p>

    <div v-if="editor" class="editor">
      <EditorMenuBar />
      <div v-if="showHtmlCode" class="editor-container" :class="{ code: showHtmlCode }">
        <textarea v-model="htmlContent" class="html-textarea tiptap ProseMirror"></textarea>
      </div>
      <EditorContent v-else class="editor-container" :editor="editor" />
      <!-- <BubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
        <div class="bubble-menu">
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
          >
            Bold
          </button>
          <button
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
          >
            Italic
          </button>
          <button
            @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
          >
            Strike
          </button>
        </div>
      </BubbleMenu> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor {
  border: 1px solid var(--tabs-border-color);
  border-radius: 0.375rem;
  overflow: hidden;
}

.bubble-menu {
  --white: #fff;
  --gray-1: rgba(61, 37, 20, 0.05);
  --gray-3: rgba(61, 37, 20, 0.12);
  --shadow: 0px 12px 33px 0px rgba(0, 0, 0, 0.06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, 0.04);

  background-color: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.2rem;

  button {
    background-color: unset;

    &:hover {
      background-color: var(--gray-3);
    }

    &:hover,
    &.is-active {
      background-color: var(--color);
    }
  }
}
</style>
