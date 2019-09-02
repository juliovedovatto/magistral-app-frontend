import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import Router from '@/routes'
import Store from '@/store'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (Store.getters.token) {
    config.headers['Authorization'] = `Bearer ${Store.getters.token}`
  }

  return config
})

axios.interceptors.response.use((response: AxiosResponse) => {
  const { statusCode, data } = response.data

  if (statusCode) {
    response.status = statusCode
  }
  if (data) {
    response.data = data
  }

  return response
}, async (err: AxiosError) => {
  const { status } = err.response as AxiosResponse

  if (status === 401) {
    await Store.dispatch('logout')
    await Router.push({ name: 'login' })
  }

  throw err
})

export default axios
