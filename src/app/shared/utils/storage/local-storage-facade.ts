export const getStorageItem = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? item : undefined;
}

export const setStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, value)
}

export const removeStorageItem = (key: string) => {
  localStorage.removeItem(key)
} 

export const clearStorage = () => {
  localStorage.clear()
}
