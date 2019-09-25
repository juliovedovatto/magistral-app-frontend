import Vue, { PluginObject, VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  export interface Vue {
    $bus: Vue
  }
}

const bus = new Vue()

function install (instance: VueConstructor, options?: any): void {
  Object.defineProperties(instance.prototype, {
    $bus: {
      get () {
        return bus
      }
    }
  })
}

export const plugin: PluginObject<any> = {
  install
}

export default plugin
