<template>
  <b-alert class="alert-message-component mt-2 mb-2" show :dismissible="close" fade :variant="type">
    <slot>
      <ul v-if="isMessageObject">
        <li class="message" v-for="(m, index) in message" :key="`message-${index}`">{{ m }}</li>
      </ul>
      <ul v-else-if="isMessageArray">
        <li class="message" v-for="(m, index) in message" :key="`message-${index}`">{{ index }}: {{ m }}</li>
      </ul>
      <p v-else>{{ message }}</p>
    </slot>
  </b-alert>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BModal } from 'bootstrap-vue'

@Component
export default class AlertMessage extends Vue {
  @Prop({ required: false, type: String, default: 'light' })
  private type!: FeedbackMessage['type']
  @Prop({ required: false, default: '' })
  private message!: FeedbackMessage['message']
  @Prop({ type: Boolean, default: true })
  private close!: boolean

  get hasMessage (): boolean {
    return Object.values(this.message).length > 0
  }

  get isMessageObject (): boolean {
    return this.message.constructor === Object
  }

  get isMessageArray (): boolean {
    return this.message.constructor === Array
  }

  before
}
</script>

<style lang="scss" scoped>
    .alert-message-component {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        > li {
          margin: 0 0 1rem 0;
        }
      }

      p {
        &:only-of-type {
          margin-bottom: 0;
        }
      }
    }
</style>
