import { Vue } from 'vue-property-decorator'

export const eventBus = () => {
  const bus = new Vue()

  return bus
}

export const triggerEventBus = (event: string, ...args: any) => {
  const bus = eventBus()

  bus.$emit(event, ...args)
}
