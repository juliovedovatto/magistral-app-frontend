import VueRouter, { Route, RouterOptions } from 'vue-router'

import Routes from './routes'
import Vue from 'vue'

Vue.use(VueRouter)

const Options: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: Routes
}
const Router: VueRouter = new VueRouter(Options)

console.log(typeof Router)

Router.beforeEach((to: Route, from: Route, next: Function) => {
  document.title = (to.meta.title ? `${to.meta.title} - ` : '') + 'Cia. Magistral Admin'
  next()
})

export default Router
