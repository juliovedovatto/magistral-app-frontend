import Vue, { PluginObject, VueConstructor } from 'vue'

import { eventBus } from '@/utils/event-bus'

declare module 'vue/types/vue' {
  export interface Vue {
    $bus: Vue
  }
}

function install (instance: VueConstructor, options?: any): void {
  const bus = eventBus()

  Object.defineProperty(instance.prototype, '$bus', {
    get () {
      return bus
    }
  })
}

export const plugin: PluginObject<any> = {
  install
}

export default plugin
