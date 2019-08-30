import { GetterTree } from 'vuex'
import StoreState from '@/types/StoreState'

const Getters: GetterTree<StoreState, any> = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
}

export default Getters
