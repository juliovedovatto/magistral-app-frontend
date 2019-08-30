import VueRouter, { Route, RouterOptions } from 'vue-router'

import Routes from './routes'
import Store from '@/store'
import Vue from 'vue'

Vue.use(VueRouter)

const Options: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: Routes
}
const Router: VueRouter = new VueRouter(Options)

Router.beforeEach((to: Route, from: Route, next: Function) => {
  document.title = (to.meta.title ? `${to.meta.title} - ` : '') + 'Cia. Magistral Admin'
  next()
})
Router.beforeEach((to: Route, from: Route, next: Function) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters.isLoggedIn) {
      return next('/login')
    }
  }
  next()
})

export default Router
