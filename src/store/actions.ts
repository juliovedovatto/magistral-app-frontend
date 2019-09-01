import { ActionTree } from 'vuex'
import Repository from '@/repository'
import StoreState from '@/types/StoreState'

const Actions: ActionTree<StoreState, any> = {
  async login ({ commit }, data) {
    return new Promise(async (resolve, reject) => {
      commit('auth_request')

      try {
        const { token } = await Repository.Auth.login(data.login, data.senha)

        commit('auth_success', token)
        resolve(token)
      } catch (err) {
        commit('auth_error')
        reject(err)
      }
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
