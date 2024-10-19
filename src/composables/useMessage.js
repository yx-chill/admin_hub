import { createDiscreteApi } from 'naive-ui'

const { message: showMsg } = createDiscreteApi(['message'], {
  messageProviderProps: { placement: 'top-right', duration: 5000 }
})

export function successMsg(msg) {
  return showMsg.success(msg)
}

export function errorMsg(msg) {
  return showMsg.error(msg)
}

export function warningMsg(msg) {
  return showMsg.warning(msg)
}