import './style.scss'

import App from '@/App.vue'
import BootstrapVue from 'bootstrap-vue'
import Router from '@/routes'
import Store from '@/store'
import Vue from 'vue'
import VueContentPlaceholders from 'vue-content-placeholders'
import VueDate from '@/plugins/date'
import VueMask from 'v-mask'
import VueNl2Br from 'vue-nl2br'
import Vuex from 'vuex'

Vue.config.productionTip = false

// PLUGINS
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueContentPlaceholders)
Vue.use(VueMask)
Vue.use(VueDate)

// GLOBAL COMPONENTS
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
