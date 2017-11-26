import axios from 'axios'

const URL = 'http://localhost:8000/pass.csv'

export interface Option {
  id: number
  label: string
  value: string
}

export class Http {
  fetchOptions(): Promise<Option[]> {
    return axios
    .get(URL)
    .then(resp => {
      const data = resp.data as string
      return parseCSV(data)
    })
    .then(parsedCSV => {
      return parsedCSV.filter((_, i) => i !== 0).map((e, i) => ({
        id: i,
        label: e[1],
        value: e[3]
      }))
    })
  }
}

function parseCSV(csv: string): string[][] {
  return csv
    .split(/\n/)
    .filter((_, i, arr) => i !== arr.length - 1)
    .map(e => e.split(',').map(e => JSON.parse(e)))
} 