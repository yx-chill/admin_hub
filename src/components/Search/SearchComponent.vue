<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['search'])

const inputRef = ref(null)
const keyword = ref('')
const currentKeyword = ref('')

const search = () => {
  if (keyword.value === currentKeyword.value) return

  currentKeyword.value = keyword.value
  emit('search', currentKeyword.value)
}

const clear = () => {
  keyword.value = ''
  currentKeyword.value = ''
  emit('search', currentKeyword.value)
  inputRef.value?.focus()
}
</script>

<template>
  <div class="search-group">
    <label for="group-keyword" class="group">
      <div class="input">
        <input ref="inputRef" v-model="keyword" type="text" required @keyup.enter="search" />
        <p class="placeholder">關鍵字</p>
        <button
          type="button"
          class="btn-clear"
          :class="{ show: keyword.length > 0 }"
          @click="clear"
        >
          <Icon icon="lsicon:clear-outline" />
        </button>
      </div>
      <button type="button" class="btn-search" title="搜尋" @click="search">
        <Icon icon="si:search-duotone" />
      </button>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.search-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 20px;
}

.group {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.input {
  position: relative;

  input {
    width: 100%;
    font-size: 1rem;
    letter-spacing: 0.1em;
    color: var(--color-text);
    background: var(--item-background);
    border-radius: 4px;
    box-shadow: var(--right-offset-shadow), var(--right-offset-shadow), var(--shadow);
    outline: none;
    border: 1px solid transparent;
    padding: 8px 30px 8px 10px;
    transition: 0.25s ease;

    &:focus,
    &:valid {
      border-color: var(--color);

      + .placeholder {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color);
        top: 0;
        background: linear-gradient(
          to bottom,
          transparent 0,
          transparent 50%,
          var(--item-background) 50%
        );
      }
    }
  }

  .placeholder {
    font-size: 1rem;
    line-height: 1;
    letter-spacing: 0.05rem;
    color: var(--color-text);
    background: var(--item-background);
    position: absolute;
    top: calc(50% + 2px);
    left: 11px;
    transform: translateY(-50%);
    transition: 0.25s ease;
    padding: 0 5px;
    pointer-events: none;
  }

  .btn-clear {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: transparent;
    border: none;
    padding: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;

    &.show {
      opacity: 1;
      pointer-events: all;
    }

    svg {
      color: var(--color-text);
      width: 100%;
      height: 100%;
    }
  }
}

.btn-search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  color: var(--color);
  background-color: transparent;
  border: none;
  padding: 0;

  svg {
    width: 90%;
    height: 90%;
  }
}
</style>
