import JWTDecode from 'jwt-decode'
import JWTPayload from '@/types/JWTPayload'
import { MutationTree } from 'vuex'
import StoreState from '@/types/StoreState'
import UserModel from '@/models/UserModel'

const Mutations: MutationTree<StoreState> = {
  auth_request (state: StoreState) {
    state.status = 'loading'
  },
  auth_success (state: StoreState, payload) {
    const result: JWTPayload = JWTDecode(payload)
    const User = new UserModel()

    User.Id = result.data.id
    User.Nome = result.data.nome
    User.Email = result.data.email
    User.Login = result.data.login
    User.Status = result.data.status
    User.Nivel = result.data.nivel

    state.status = 'success'
    state.token = payload
    state.user = User
  },
  auth_error (state: StoreState) {
    state.status = 'error'
  },
  logout (state: StoreState) {
    state.status = ''
    state.token = ''
    state.user = null
  }
}

export default Mutations
