import './style.scss'
import 'vue-awesome/icons'

import App from '@/App.vue'
import BootstrapVue from 'bootstrap-vue'
import Icon from 'vue-awesome/components/Icon.vue'
import Log from '@/plugins/log'
import Me from '@/plugins/me'
import Router from '@/routes'
import Store from '@/store'
import Vue from 'vue'
import VueContentPlaceholders from 'vue-content-placeholders'
import VueDate from '@/plugins/date'
import VueEventBus from '@/plugins/event-bus'
import { Plugin as VueFragment } from 'vue-fragment'
import VueMask from 'v-mask'
import VueNl2Br from 'vue-nl2br'
import Vuex from 'vuex'

Vue.config.productionTip = false

// PLUGINS
Vue.use(Vuex)
Vue.use(VueFragment)
Vue.use(BootstrapVue)
Vue.use(VueContentPlaceholders)
Vue.use(VueMask)
Vue.use(VueDate)
Vue.use(VueEventBus)
Vue.use(Log)
Vue.use(Me)

// GLOBAL COMPONENTS
Vue.component('v-icon', Icon)
Vue.component('nl2br', VueNl2Br)

new Vue({
  router: Router,
  store: Store,
  render: (h) => h(App),
  async mounted () {
    // console.log('this.$route.path => ', this.$route)
    // console.log('Store.getters.isLogged => ', Store.getters.isLogged)

    // await Repository.Auth.isLogged()
  }
}).$mount('#app')
