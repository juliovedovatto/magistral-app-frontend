import 'dayjs/locale/pt-br'

import { PluginObject, VueConstructor } from 'vue'

import dayjs from 'dayjs'

declare module 'vue/types/vue' {
  export interface Vue {
    $date: dayjs.Dayjs
  }
}

function install (instance: VueConstructor, options?: any): void {
  dayjs.locale('pt-br')

  Object.defineProperties(instance.prototype, {
    $date: {
      get () {
        return dayjs
      }
    }
  })
}

export const plugin: PluginObject<any> = {
  install
}

export default plugin
