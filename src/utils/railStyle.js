import { useDark } from '@vueuse/core'

const isDark = useDark()

export default function ({ focused, checked }) {
  const style = {}
  if (checked) {
    style.background = '#4a90e2'
    if (focused) {
      style.boxShadow = '0 0 0 2px #4a90e240'
    }
  } else {
    style.background = isDark.value ? '#e88080' : '#d03050'
    if (focused) {
      style.boxShadow = isDark.value ? '0 0 0 2px #e8808040' : '0 0 0 2px #d0305040'
    }
  }
  return style
}