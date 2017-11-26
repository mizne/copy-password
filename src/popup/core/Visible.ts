export class Visible {
  private HIDDEN_CLS = 'hidden'
  constructor(
    private container: HTMLElement,
    private loading: HTMLElement,
    private field: HTMLElement
  ) {}

  showForSuccessFromNetwork(): void {
    this.hiddenLoading()
    .showContainer()
  }

  showForSuccessFromStorage(): void {
    this.showForSuccessFromNetwork()
  }

  showForFetchFailed(): void {
    this.showContainer()
    .hiddenLoading()
    .hiddenField()
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