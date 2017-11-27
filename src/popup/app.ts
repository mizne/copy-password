import { CopyButton } from './core/CopyButton'
import { MailSelect } from './core/MailSelect'
import { Visible } from './core/Visible'
import { Prompt } from './core/Prompt'
import { Settings } from './core/Settings'
import { Option, Http } from './core/Http'
import store from './core/store'

export class App {
  private mailSelect: MailSelect
  private prompt: Prompt
  private visible: Visible
  private http: Http
  private settings: Settings

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
    const settingsEl = document.querySelector('.settings') as HTMLElement

    this.mailSelect = new MailSelect(mailSelect, mailInput)
    this.prompt = new Prompt(prompt)
    this.visible = new Visible(container, loading, field)
    this.http = new Http()
    this.settings = new Settings(settingsEl)
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
    this.settings.registryToOptionsPage()
  }

  private fetchSuccessFromNetwork(options: Option[]) {
    store.setDataItems(options)
    this.visible.showForSuccessFromNetwork()
    this.mailSelect.initSelectOptions(options)
    .attachSelectToInput()
    this.prompt.promptInfo(
      '更新所有项目成功！选择左边项目，再点击右边复制按钮，复制到剪贴板！'
    )

    new CopyButton('.clipboard', this.prompt)
      .registerError()
      .registerSuccess()
  }

  private fetchErrorFromNetwork(errMsg: string): void {
    const options = store.getDataItems()

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
    this.prompt.promptInfo(
      '获取缓存所有项目成功！选择左边项目，再点击右边复制按钮，复制到剪贴板！'
    )
    new CopyButton('.clipboard', this.prompt)
      .registerError()
      .registerSuccess()
  }

  private fetchFailed(errMsg: string) {
    this.prompt.promptError(`查询所有项目失败！ ${errMsg}`)
    this.visible.showForFetchFailed()
  }
}
