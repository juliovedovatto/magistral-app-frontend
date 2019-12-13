import { Route } from 'vue-router'
import Store from '@/store'

const loginRedirect = (to: Route, from: Route, next: Function) => {
  if (to.name && to.name === 'login' && Store.getters.isLoggedIn) {
    return next('/')
  }
  next()
}

export default loginRedirect
