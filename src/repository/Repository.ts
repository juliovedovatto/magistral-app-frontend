import * as url from 'url'

import { APP_API_ENDPOINT } from '@/config'
import Api from '@/api'
import ApiParams from '@/types/ApiParams'

const baseDomain = APP_API_ENDPOINT || 'http://localhost:8000'
const baseURL = `${baseDomain}/`

function buildEndpointURL (endpoint: string): string {
  return url.resolve(baseURL, endpoint)
}

export default {
  async get (endpoint: string, params?: ApiParams) {
    return Api.get(buildEndpointURL(endpoint), params)
  },
  async post (endpoint: string, body?: ApiParams) {
    return Api.post(buildEndpointURL(endpoint), body)
  },
  async put (endpoint: string, body?: ApiParams) {
    return Api.put(buildEndpointURL(endpoint), body)
  },
  async delete (endpoint: string, data?: ApiParams) {
    return Api.delete(buildEndpointURL(endpoint), { data })
  }
}
