import './options.css'
// import { App } from './app'
import Store from '../popup/core/Store'
import { Prompt } from '../popup/core/Prompt'

document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.querySelector('.file-input') as HTMLInputElement
  const prompt = document.querySelector('.message') as HTMLElement

  const promptObj = new Prompt(prompt)
  promptObj.promptInfo(`暂且只支持处理json格式文件！`)

  fileInput.addEventListener('change', function onChange(): void {
    const reader = new FileReader()
    const file = this.files[0]
    reader.onload = function onReaderLoad(): void {
      try {
        const obj = JSON.parse(this.result) as { [key: string]: string }
        const dataItems = Object.keys(obj).map((key, i) => ({
          id: i,
          label: key,
          value: obj[key]
        }))
        Store.setDataItems(dataItems)
        promptObj.promptSuccess(`解析并上传成功！`)
        window.setTimeout(() => {
          promptObj.promptInfo(`暂且只支持处理json格式文件！`)
        }, 2e3)
      } catch(e) {
        promptObj.promptError(`解析失败！只支持json格式，上传文件为${file.type}格式！`)
        window.setTimeout(() => {
          promptObj.promptInfo(`暂且只支持处理json格式文件！`)
        }, 5e3)
      }
      
    }
    reader.readAsText(file)
  })

})

