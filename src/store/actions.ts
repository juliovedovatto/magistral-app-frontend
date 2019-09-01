import { ActionTree } from 'vuex'
import Api from '@/utils/api'
import StoreState from '@/types/StoreState'

const Actions: ActionTree<StoreState, any> = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('auth_request')

      Api({ url: 'http://localhost:8000/auth/login', data, method: 'POST' })
        .then(response => {
          const { token } = response.data

          commit('auth_success', token)
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

      resolve()
    })
  }
}

export default Actions
