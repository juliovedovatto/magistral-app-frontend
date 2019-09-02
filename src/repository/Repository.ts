import Api from '@/utils/api'
import ApiParams from '@/types/ApiParams'

const baseDomain = 'http://localhost:8000'
const baseURL = `${baseDomain}/`

export default {
  async get (endpoint: string, params?: ApiParams) {
    return Api.get(`${baseURL}${endpoint}`, params)
  },
  async post (endpoint: string, body?: ApiParams) {
    return Api.post(`${baseURL}${endpoint}`, body)
  },
  async put (endpoint: string, body?: ApiParams) {
    return Api.put(`${baseURL}${endpoint}`, body)
  },
  async delete (endpoint: string) {
    return Api.delete(`${baseURL}${endpoint}`)
  }
}
