import Vuex, { Store, StoreOptions } from 'vuex'

import Actions from './actions'
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
  actions: Actions
}

export default new Store<StoreState>(Options)
