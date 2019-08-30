import { MutationTree } from 'vuex'
import StoreState from '@/types/StoreState'

const Mutations: MutationTree<StoreState> = {
  auth_request (state: StoreState) {
    state.status = 'loading'
  },
  auth_success (state: StoreState, data) {
    state.status = 'success'
    state.token = data.token
    state.user = data.user

    console.log('data => ', data)
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
