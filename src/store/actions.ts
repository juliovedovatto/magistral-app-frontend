import { ActionTree } from 'vuex'
import Api from '@/utils/api'
import StoreState from '@/types/StoreState'

const Actions: ActionTree<StoreState, any> = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('auth_request')

      Api({ url: 'http://localhost:8000/auth/login', data, method: 'POST' })
        .then(response => {
          const { token, user } = response.data

          localStorage.setItem('token', token)

          // Add the following line:
          Api.defaults.headers.common['Authorization'] = token

          commit('auth_success', token, user)
          resolve(response)
        })
        .catch(err => {
          localStorage.removeItem('token')

          commit('auth_error')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')

      localStorage.removeItem('token')

      delete Api.defaults.headers.common['Authorization']

      resolve()
    })
  }
}

export default Actions
