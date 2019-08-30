import Vuex, { Store, StoreOptions } from 'vuex'

import Actions from './actions'
import Getters from './getters'
import Mutations from './mutations'
import StoreState from '@/types/StoreState'
import UserModel from '@/models/UserModel'
import Vue from 'vue'

Vue.use(Vuex)

const State: StoreState = {
  status: '',
  user: new UserModel(),
  token: ''
}

const Options: StoreOptions<StoreState> = {
  state: State,
  mutations: Mutations,
  actions: Actions,
  getters: Getters
}

export default new Store<StoreState>(Options)
