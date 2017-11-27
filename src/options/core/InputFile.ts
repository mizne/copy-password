import { Observable } from 'rxjs/Observable'

export class InputFile {
  constructor(private input: HTMLInputElement) {}

  readFile(): Observable<string | ErrorEvent> {
    return new Observable((observer) => {
      this.input.addEventListener('change', function onChange(): void {
        const reader = new FileReader()
        const file = this.files[0]
        reader.onload = function onReaderLoad(): void {
          observer.next(this.result)
        }
        reader.onerror = function onReaderError(ev: ErrorEvent): void {
          observer.next(ev)
        }
        reader.readAsText(file)
      })
    })
  }
}
