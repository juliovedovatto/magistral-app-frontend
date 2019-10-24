import { PluginObject, VueConstructor } from 'vue'

import Store from '@/store'
import User from '@/models/User'

declare module 'vue/types/vue' {
  export interface Vue {
    $me: Maybe<User>
  }
}

function install (instance: VueConstructor, options?: any): void {
  Object.defineProperty(instance.prototype, '$me', {
    get: () => { return Store.getters.user }
  })
}

export const plugin: PluginObject<any> = {
  install
}

export default plugin
