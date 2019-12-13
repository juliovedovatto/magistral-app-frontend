import { AxiosRequestConfig } from 'axios'
import Store from '@/store'

const setBearer = (config: AxiosRequestConfig) => {
  if (Store.getters.token) {
    config.headers['Authorization'] = `Bearer ${Store.getters.token}`
  }

  return config
}

export default setBearer
