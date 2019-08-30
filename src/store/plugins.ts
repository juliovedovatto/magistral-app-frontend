import { Plugin } from 'vuex'
import StoreState from '@/types/StoreState'
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist<StoreState>({
  key: 'store', // The key to store the state on in the storage provider.
  storage: sessionStorage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const Plugins: Plugin<StoreState>[] = [
  vuexLocalStorage.plugin
]

export default Plugins
