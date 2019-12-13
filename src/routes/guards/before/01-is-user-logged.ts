import { Route } from 'vue-router'
import Store from '@/store'

const isUserLogged = async (to: Route, from: Route, next: Function) => {
  const requiredAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiredAuth && !Store.getters.isLoggedIn) {
    await Store.dispatch('logout')
    return next('/logout')
  }

  next()
}

export default isUserLogged
