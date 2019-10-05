import { GetterTree } from 'vuex'
import JWTPayload from '@/types/JWTPayload'
import JwtDecode from 'jwt-decode'
import StoreState from '@/types/StoreState'

const Getters: GetterTree<StoreState, any> = {
  token: (state: StoreState) => state.token,
  isLoggedIn: (state: StoreState) => {
    if (!state.user || !state.token) {
      return false
    }

    const now = Date.now().valueOf() / 1000
    const payload: JWTPayload = JwtDecode(state.token)
    const { exp, nbf } = payload

    return (exp && exp >= now) || (nbf && nbf <= now)
  },
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
