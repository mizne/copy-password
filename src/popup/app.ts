import { CopyButton } from './core/CopyButton'
import { MailSelect } from './core/MailSelect'
import { Visible } from './core/Visible'
import { Prompt } from './core/Prompt'
import { Option, Http } from './core/Http'
import store from './core/store'

export class App {
  private mailSelect: MailSelect
  private prompt: Prompt
  private visible: Visible
  private http: Http

  constructor() {
    this.initField()
  }

  start(): void {
    this.initEvent()
  }

  private initField(): void {
    const mailSelect = document.querySelector(
      '.mail-select'
    ) as HTMLSelectElement
    const mailInput = document.querySelector('.mail-input') as HTMLInputElement
    const prompt = document.querySelector('.message') as HTMLElement

    const container = document.querySelector('.container') as HTMLElement
    const loading = document.querySelector('.loading') as HTMLElement
    const field = document.querySelector('.field') as HTMLElement

    this.mailSelect = new MailSelect(mailSelect, mailInput)
    this.prompt = new Prompt(prompt)
    this.visible = new Visible(container, loading, field)
    this.http = new Http()
  }

  private initEvent(): void {
    this.http.fetchOptions()
      .then(options => {
        this.fetchSuccessFromNetwork(options)
      })
      .catch(e => {
        this.fetchErrorFromNetwork(e.message)
      })

    this.mailSelect.initSelectChange()
  }

  private fetchSuccessFromNetwork(options: Option[]) {
    store.set('options', options)
    this.visible.showForSuccessFromNetwork()
    this.mailSelect.initSelectOptions(options)
    .attachSelectToInput()
    this.prompt.promptInit(
      '更新所有项目成功！选择左边项目，再点击右边复制按钮，复制到剪贴板！'
    )

    new CopyButton('.clipboard', this.prompt)
      .registerError()
      .registerSuccess()
  }

  private fetchErrorFromNetwork(errMsg: string): void {
    const options = store.get('options')

    if (options) {
      this.fetchSuccessFromStorage(options)
    } else {
      this.fetchFailed(errMsg)
    }
  }

  private fetchSuccessFromStorage(options: Option[]) {
    this.visible.showForSuccessFromStorage()
    this.mailSelect.initSelectOptions(options)
    .attachSelectToInput()
    this.prompt.promptInit(
      '获取所有项目成功！选择左边项目，再点击右边复制按钮，复制到剪贴板！'
    )
    new CopyButton('.clipboard', this.prompt)
      .registerError()
      .registerSuccess()
  }

  private fetchFailed(errMsg: string) {
    this.prompt.promptError(`获取所有项目失败！ ${errMsg}`)
    this.visible.showForFetchFailed()
  }
}