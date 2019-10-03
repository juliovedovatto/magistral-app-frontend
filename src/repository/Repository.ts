import * as url from 'url'

import Api from '@/utils/api'
import ApiParams from '@/types/ApiParams'

const baseDomain = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:8000'
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
  async delete (endpoint: string) {
    return Api.delete(buildEndpointURL(endpoint))
  }
}
