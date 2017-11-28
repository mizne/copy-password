import Store from '../popup/core/Store'
import { Prompt } from '../popup/core/Prompt'
import { InputFile } from './core/InputFile'

export class App {
  private inputFile: InputFile
  private prompt: Prompt

  constructor() {
    this.initField()
  }

  start(): void {
    this.initEvent()
  }

  private initField(): void {
    const fileInput = document.querySelector('.file-input') as HTMLInputElement
    const prompt = document.querySelector('.message') as HTMLElement

    this.prompt = new Prompt(prompt)
    this.inputFile = new InputFile(fileInput)
  }

  private initEvent(): void {
    this.inputFile.readFile().subscribe(textOrError => {
      if (textOrError instanceof ErrorEvent) {
        this.prompt.promptError(`读取文件失败！ ${textOrError.message}`)
      } else {
        this.parseText(textOrError)
      }
    })
    this.prompt.promptInfo(`暂且只支持处理json格式文件！`)
  }

  private parseText(text: string): void {
    try {
      const obj = JSON.parse(text) as { [key: string]: string }
      const dataItems = Object.keys(obj).map((key, i) => ({
        id: i,
        label: key,
        value: obj[key]
      }))
      Store.setDataItems(dataItems)
      this.prompt.promptSuccess(`解析并上传成功！`)
      window.setTimeout(() => {
        this.prompt.promptInfo(`暂且只支持处理json格式文件！`)
      }, 2e3)
    } catch (e) {
      this.prompt.promptError(`解析失败！暂且只支持json格式！`)
      window.setTimeout(() => {
        this.prompt.promptInfo(`暂且只支持处理json格式文件！`)
      }, 5e3)
    }
  }
}
