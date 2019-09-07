import 'dayjs/locale/pt-br'

import Vue from 'vue'
import dayjs from 'dayjs'

export default function VueDate (instance: typeof Vue, options?: any): void {
  dayjs.locale('pt-br')

  instance.prototype.$date = dayjs
}
