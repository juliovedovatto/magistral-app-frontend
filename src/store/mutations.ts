import { MutationTree } from 'vuex'
import StoreState from '@/types/StoreState'

const Mutations: MutationTree<StoreState> = {
  auth_request (state: StoreState) {
    state.status = 'loading'
  },
  auth_success (state: StoreState, payload) {
    state.status = 'success'
    state.token = payload.token
    state.user = payload.user
  },
  auth_error (state: StoreState) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
    state.user = null
  }
}

export default Mutations
