import axios from 'axios'

const URL = 'http://localhost:8000/password.json'

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
      console.log(resp.data)
      return resp.data
    })
    .then(obj => {
      return Object.keys(obj).map((key, i) => ({
        id: i,
        label: key,
        value: obj[key]
      }))
    })
  }
}
