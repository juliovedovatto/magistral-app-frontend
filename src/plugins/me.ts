import { PluginObject, VueConstructor } from 'vue'

import { Nivel } from '@/enums/Usuario'
import Store from '@/store'
import User from '@/models/User'

interface UserMe extends User {
  isAdmin?: boolean
}

declare module 'vue/types/vue' {
  export interface Vue {
    $me: Nullable<UserMe>
  }
}

function install (instance: VueConstructor, options?: any): void {
  const me: Nullable<UserMe> = Store.getters.user

  if (me) {
    me.isAdmin = me.Nivel === Nivel.ADMIN
  }

  Object.defineProperty(instance.prototype, '$me', {
    get: () => { return me }
  })
}

export const plugin: PluginObject<any> = {
  install
}

export default plugin
