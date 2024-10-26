export default function ({ id, action }, permissions = {}) {
  const filteredActions = {}

  // 只保留值為 true 的項目
  for (const [key, value] of Object.entries(action)) {
    if (value) {
      filteredActions[key] = permissions?.[id]?.[key] ?? value
    }
  }

  return filteredActions
}