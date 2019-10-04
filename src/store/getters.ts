import { GetterTree } from 'vuex'
import StoreState from '@/types/StoreState'

const Getters: GetterTree<StoreState, any> = {
  token: (state: StoreState) => state.token,
  isLoggedIn: (state: StoreState) => !!state.token,
  authStatus: (state: StoreState) => state.status,
  user: (state: StoreState) => state.user && state.user.Id > 0 ? state.user : null
}

export default Getters

export function getDefaultState (): StoreState {
  return {
    status: '',
    user: null,
    token: ''
  }
}
