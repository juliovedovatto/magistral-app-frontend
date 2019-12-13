import { NavigationGuard, Route } from 'vue-router'

interface RouteGuards {
  before?: NavigationGuard[],
  after?: ((to: Route, from: Route) => any)[],
  resolve?: NavigationGuard[],
}

const before = require.context('./before/', false, /.+\.ts$/i)
const resolve = require.context('./resolve/', false, /.+\.ts$/i)
const after = require.context('./after/', false, /.+\.ts$/i)

const guards: RouteGuards = {
  before: before.keys().sort().map(key => {
    return before(key).default
  }),
  after: after.keys().sort().map(key => {
    return before(key).default
  }),
  resolve: resolve.keys().sort().map(key => {
    return before(key).default
  })
}

export default guards
