import { CopyButton } from './core/CopyButton'
import { MailSelect } from './core/MailSelect'
import { Visible } from './core/Visible'
import { Prompt } from './core/Prompt'
import { Settings } from './core/Settings'
import { Option, Http } from './core/Http'
import Store from './core/Store'

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
    this.fetchOptions()
    this.mailSelect.initSelectChange()
    this.settings.registryToOptionsPage()
  }

  private fetchOptions(): void {
    Store.getDataItems().then(dataItems => {
      if (dataItems) {
        this.fetchSuccess(dataItems)
      } else {
        this.fetchFailed(
          `您还没有上传要保存的数据，请点击右边的 配置选项图标 上传数据！`
        )
      }
    })
  }

  private fetchSuccess(options: Option[]) {
    this.visible.showForSuccess()
    this.mailSelect.initSelectOptions(options).attachSelectToInput()
    this.prompt.promptInfo(
      '更新所有项目成功！选择左边项目，再点击右边复制按钮，复制到剪贴板！'
    )

    new CopyButton('.clipboard', this.prompt).registerError().registerSuccess()
  }

  private fetchFailed(errMsg: string) {
    this.prompt.promptError(`${errMsg}`)
    this.visible.showForFetchFailed()
  }
}
