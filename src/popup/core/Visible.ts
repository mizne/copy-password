export class Visible {
  private HIDDEN_CLS = 'hidden'
  constructor(
    private container: HTMLElement,
    private loading: HTMLElement,
    private field: HTMLElement
  ) {}

  showForSuccess(): void {
    this.hiddenLoading()
    .showContainer()
  }

  showForFetchFailed(): void {
    this.showContainer()
    .hiddenLoading()
  }

  private showContainer(): Visible {
    this.container.classList.remove(this.HIDDEN_CLS)

    return this
  }

  private hiddenLoading(): Visible {
    this.loading.classList.add(this.HIDDEN_CLS)

    return this
  }

  private hiddenField(): Visible {
    this.field.classList.add(this.HIDDEN_CLS)

    return this
  }
}