import { Route } from 'vue-router'

const setPageTitle = async (to: Route, from: Route, next: Function) => {
  document.title = (to.meta.title ? `${to.meta.title} - ` : '') + 'Cia. Magistral Admin'
  next()
}

export default setPageTitle
