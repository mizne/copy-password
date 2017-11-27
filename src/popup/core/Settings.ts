declare const chrome: any

export class Settings {
  constructor(
    private icon: HTMLElement
  ) {}

  registryToOptionsPage(): void {
    this.icon.addEventListener('click', function () {
      chrome.runtime.openOptionsPage(function()　{})
    })
  }
}


