import Interceptors from './interceptors'
import axios from 'axios'

Interceptors.request && Interceptors.request.forEach(interceptor => axios.interceptors.request.use(interceptor))
Interceptors.response && Interceptors.response.forEach(interceptor => axios.interceptors.response.use(interceptor.response, interceptor.error))

export default axios
