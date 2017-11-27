import { Option } from './Http'

declare const chrome: any
const DATA_ITEMS = 'DATA_ITEMS'
const DATA_SOURCE = 'DATA_SOURCE'

export default class Store {
  static setDataItems(items: Option[]): Promise<void> {
    return new Promise(res => {
      chrome.storage.sync.set(
        {
          [DATA_ITEMS]: items
        },
        function() {
          res()
        }
      )
    })
  }

  static getDataItems(): Promise<Option[]> {
    return new Promise(res => {
      chrome.storage.sync.get(DATA_ITEMS, function(obj: any) {
        res(obj[DATA_ITEMS])
      })
    })
  }

  static removeDataItems(): Promise<void> {
    return new Promise(res => {
      chrome.storage.sync.remove(DATA_ITEMS, function() {
        res()
      })
    })
  }

  static clear(): Promise<void> {
    return new Promise(res => {
      chrome.storage.sync.clear(function() {
        res()
      })
    })
  }
}
