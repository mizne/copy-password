import axios from 'axios'
import store from './store'

const DEFAULT_URL = 'http://localhost:8000/password.json'

export interface Option {
  id: number
  label: string
  value: string
}

export class Http {
  fetchOptions(): Promise<Option[]> {
    // const url = store.getDataSource() || DEFAULT_URL
    // return axios
    // .get(url)
    // .then(resp => {
    //   console.log(resp.data)
    //   return resp.data
    // })
    // .then(obj => {
    //   return Object.keys(obj).map((key, i) => ({
    //     id: i,
    //     label: key,
    //     value: obj[key]
    //   }))
    // })

    return Promise.resolve([
      {
        id: 0,
        label: 'gmail',
        value: 'gmailValue'
      }
    ])
  }
}
