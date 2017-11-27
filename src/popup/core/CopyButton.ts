import * as Clipboard from 'clipboard'

import { Prompt } from './Prompt'

export class CopyButton {
  private clipboard: Clipboard
  private prompt: Prompt
  constructor(cls: string, prompt: Prompt) {
    this.clipboard = new Clipboard(cls, {})
    this.prompt = prompt
  }

  registerSuccess(): CopyButton {
    this.clipboard.on('success', (e) => {
      e.clearSelection()
      this.prompt.promptSuccess(`复制成功！`)
      window.setTimeout(() => {
        this.prompt.promptInfo(`选择左边项目，再点击右边复制按钮，复制到剪贴板！`)
      }, 2e3)
    })

    return this
  }

  registerError(): CopyButton {
    this.clipboard.on('error', () => {
      this.prompt.promptError(`复制失败！`)
      window.setTimeout(() => {
        this.prompt.promptInfo(`选择左边项目，再点击右边复制按钮，复制到剪贴板！`)
      }, 2e3)
    })

    return this
  }
}
