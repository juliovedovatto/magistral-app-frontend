import VueRouter, { Route, RouterOptions } from 'vue-router'

import Guards from './guards'
import Routes from './routes'
import Vue from 'vue'

Vue.use(VueRouter)

const Options: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: Routes
}
const Router: VueRouter = new VueRouter(Options)

Guards.before && Guards.before.forEach(guard => Router.beforeEach(guard))
Guards.resolve && Guards.resolve.forEach(guard => Router.beforeResolve(guard))
Guards.after && Guards.after.forEach(guard => Router.afterEach(guard))

export default Router
