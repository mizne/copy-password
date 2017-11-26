import { Option } from './Http'

export class MailSelect {
  constructor(
    private select: HTMLSelectElement,
    private input: HTMLInputElement
  ) {
  }

  initSelectChange(): MailSelect {
    this.select.addEventListener('change', _ => {
      this.attachSelectToInput()
    })

    return this
  }

  attachSelectToInput(): MailSelect {
    this.input.value = this.select.value

    return this
  }

  initSelectOptions(options: Option[]): MailSelect {
    options.forEach(opt => {
      const optEle = document.createElement('option')
      optEle.value = opt.value
      optEle.innerText = opt.label
      this.select.insertBefore(optEle, null)
    })

    return this
  }
}
