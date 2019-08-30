import './style.scss'

import App from '@/App.vue'
import BootstrapVue from 'bootstrap-vue'
import Router from '@/routes'
import Store from '@/store'
import Vue from 'vue'
import VueContentPlaceholders from 'vue-content-placeholders'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueContentPlaceholders)

new Vue({ router: Router, store: Store, render: (h) => h(App) }).$mount('#app')
