const DATA_ITEMS = 'DATA_ITEMS'
const DATA_SOURCE = 'DATA_SOURCE'

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

function setDataSource(v: string): void {
  set(DATA_SOURCE, v) 
}

function getDataSource(): string {
  return get(DATA_SOURCE)
}

function setDataItems(items: any[]): void {
  set(DATA_ITEMS, items)
}

function getDataItems(): any[] {
  return get(DATA_ITEMS)
}

export default {
  setDataSource,
  getDataSource,
  setDataItems,
  getDataItems
}