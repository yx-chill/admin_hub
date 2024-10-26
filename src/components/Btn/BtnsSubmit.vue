<script setup>
defineProps({
  resetState: {
    type: Boolean,
    default: false
  },
  submitState: {
    type: Boolean,
    default: false
  },
  showReset: {
    type: Boolean,
    default: false
  }
})
defineEmits(['submit', 'reset'])
</script>

<template>
  <div class="btns">
    <button
      v-if="showReset"
      type="button"
      class="btn-reset"
      title="重置"
      :disabled="resetState"
      @click="$emit('reset')"
    >
      重置
    </button>

    <button
      type="button"
      class="btn-submit"
      title="送出"
      :disabled="submitState"
      @click="$emit('submit')"
    >
      送出
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 10px;
  padding-top: 20px;

  a,
  button {
    position: relative;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: #fff;
    background: var(--color);
    border-radius: 8px;
    border: none;
    padding: 0.75rem 1.75rem;
    z-index: 0;
    transition: 0.3s ease;

    &:hover:not(:disabled) {
      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      border-radius: inherit;
      background: inherit;
      filter: blur(5px);
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    &.btn-reset {
      background: var(--red);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
