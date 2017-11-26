export class Prompt {
  constructor(
    private prompt: HTMLElement
  ) {}

  promptSuccess(text: string): void {
    this.prompt.classList.remove('is-info', 'is-danger')
    this.prompt.classList.add('is-success')
    this.prompt.querySelector('.message-body').innerHTML = text
  }

  promptError(text: string): void {
    this.prompt.classList.remove('is-info', 'is-success')
    this.prompt.classList.add('is-danger')
    this.prompt.querySelector('.message-body').innerHTML = text
  }

  promptInit(text: string): void {
    this.prompt.classList.remove('is-success', 'is-error')
    this.prompt.classList.add('is-info')
    this.prompt.querySelector('.message-body').innerHTML = text
  }
}
