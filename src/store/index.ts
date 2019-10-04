import Getters, { getDefaultState } from './getters'
import Vuex, { Store, StoreOptions } from 'vuex'

import Actions from './actions'
import Mutations from './mutations'
import Plugins from './plugins'
import StoreState from '@/types/StoreState'
import Vue from 'vue'

Vue.use(Vuex)

const State = getDefaultState()

const Options: StoreOptions<StoreState> = {
  state: State,
  mutations: Mutations,
  actions: Actions,
  getters: Getters,
  plugins: Plugins
}

export default new Store<StoreState>(Options)
