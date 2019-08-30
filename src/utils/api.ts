import axios, { AxiosResponse } from 'axios'

import Router from '@/routes'
import Store from '@/store'

axios.interceptors.response.use(undefined, err => new Promise((resolve, reject) => {
  if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    Store.dispatch('logout').then(() => Router.push('Login')).catch()
  }

  throw err
}))

axios.interceptors.response.use((response: AxiosResponse) => {
  const { statusCode, data } = response.data

  if (statusCode) {
    response.status = statusCode
  }
  if (data) {
    response.data = data
  }

  return response
})

export default axios
