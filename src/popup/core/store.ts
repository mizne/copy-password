function set(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

function get(key: string): any {
  const original = localStorage.getItem(key)
  try {
    return JSON.parse(original)
  } catch(e) {
    console.error(e.message)
    return null
  }
}

export default {
  set, get
}