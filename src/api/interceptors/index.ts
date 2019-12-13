import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface Interceptors {
  request?: ((config: AxiosRequestConfig) => AxiosRequestConfig)[],
  response?: {
    response?: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse<any>>),
    error?: ((error: any) => any)
  }[]
}

const request = require.context('./request', false, /.+\.ts$/i)
const response = require.context('./response', false, /.+\.ts$/i)

const interceptors: Interceptors = {
  request: request.keys().sort().map(interceptor => request(interceptor).default),
  response: response.keys().sort().map(interceptor => response(interceptor).default)
}

export default interceptors
