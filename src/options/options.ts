import './options.css'
// import { App } from './app'
import store from '../popup/core/store'

document.addEventListener('DOMContentLoaded', function() {
  // new App().start()
  const originalDataSource = store.getDataSource()

  const saveBtnEle = document.querySelector('.save') as HTMLElement
  const inputEle = document.querySelector('.data-source') as HTMLInputElement
  const protocolEle = document.querySelector('.protocol') as HTMLSelectElement
  if (originalDataSource) {
    const urlObj = extractURL(originalDataSource)
    inputEle.value = urlObj.host + urlObj.path + urlObj.search + urlObj.hash
    protocolEle.value = urlObj.protocol + '//'
  }
  saveBtnEle.addEventListener('click', function() {
    const path = inputEle.value
    if (path) {
      const protocol = protocolEle.value
      store.setDataSource(protocol + path)
    }
  })
})

interface URLObj {
  protocol: string
  host: string
  path: string
  search: string
  hash: string
}

function extractURL(url: string): URLObj {
  const aTag = document.createElement('a') as HTMLAnchorElement
  aTag.href = url
  return {
    protocol: aTag.protocol,
    host: aTag.host,
    path: aTag.pathname,
    search: aTag.search,
    hash: aTag.hash
  }
}
