import { PluginObject, VueConstructor } from 'vue'

import Store from '@/store'
import UserModel from '@/models/User'

declare module 'vue/types/vue' {
  export interface Vue {
    $me: Nullable<UserModel>
  }
}

function install (instance: VueConstructor, options?: any): void {
  const me: Nullable<UserModel> = Store.getters.user

  Object.defineProperty(instance.prototype, '$me', {
    get: () => { return me }
  })
}

export const plugin: PluginObject<any> = {
  install
}

export default plugin
