import { Route } from 'vue-router'
import Store from '@/store'

const isUserLogged = (to: Route, from: Route, next: Function) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters.isLoggedIn) {
      return next('/logout')
    }
  }
  next()
}

export default isUserLogged
