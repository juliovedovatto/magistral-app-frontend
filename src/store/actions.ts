import axios from 'axios'
import { ActionTree } from 'vuex'

import StoreState from '@/types/StoreState'

const Actions: ActionTree<StoreState, any> = {
  loggin ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')

      axios({ url: 'http://localhost:8000/login', data: user, method: 'POST' })
        .then(response => {
          const { token, user } = response.data

          localStorage.setItem('token', token)

          // Add the following line:
          axios.defaults.headers.common['Authorization'] = token

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

      delete axios.defaults.headers.common['Authorization']

      resolve()
    })
  }
}

export default Actions
