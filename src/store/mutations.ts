import JWTDecode from 'jwt-decode'
import JWTPayload from '@/types/JWTPayload'
import { MutationTree } from 'vuex'
import { Nivel } from '@/enums/Usuario'
import StoreState from '@/types/StoreState'
import User from '@/models/User'
import { getDefaultState } from './getters'

const Mutations: MutationTree<StoreState> = {
  auth_request (state: StoreState) {
    state.status = 'loading'
  },
  auth_success (state: StoreState, payload) {
    const result: JWTPayload = JWTDecode(payload)
    const user = new User()

    user.Id = result.data.id
    user.Nome = result.data.nome
    user.Email = result.data.email
    user.Login = result.data.login
    user.Status = result.data.status
    user.Nivel = result.data.nivel
    user.isAdmin = user.Nivel === Nivel.ADMIN

    Object.assign(state, {
      status: 'success',
      token: payload,
      user
    })
  },
  auth_error (state: StoreState) {
    state.status = 'error'
  },
  logout (state: StoreState) {
    Mutations.resetState(state)
  },
  resetState (state: StoreState) {
    Object.assign(state, getDefaultState())
  }
}

export default Mutations
