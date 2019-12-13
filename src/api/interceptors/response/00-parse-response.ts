import { AxiosError, AxiosResponse } from 'axios'

import Router from '@/routes'
import Store from '@/store'

const response = (response: AxiosResponse) => {
  const { statusCode, data } = response.data

  if (statusCode) {
    response.status = statusCode
  }
  if (data) {
    response.data = data
  }

  return response
}
const error = async (err: AxiosError) => {
  const { status } = err.response as AxiosResponse

  if (status === 401) {
    await Store.dispatch('logout')
    await Router.push({ name: 'login' })
  }

  throw err
}

export default {
  response,
  error
}
