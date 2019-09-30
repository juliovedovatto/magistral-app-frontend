import Vue, { PluginObject, VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  export interface Vue {
    $log: Function
  }
}

function install (instance: VueConstructor, options?: any): void {
  Object.defineProperty(instance.prototype, '$log', {
    get: () => { return console.log }
  })
}

export const plugin: PluginObject<any> = {
  install
}

export default plugin
