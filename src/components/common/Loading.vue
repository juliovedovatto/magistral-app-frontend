<template>
  <b-modal ref="loading-modal" visible static lazy centered hide-header hide-header-close hide-footer no-fade no-close-on-esc no-close-on-backdrop size="sm">
    <div class="d-flex justify-content-center">
      <b-spinner class="loading" variant="light" />
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BModal } from 'bootstrap-vue'

@Component
export default class Loading extends Vue {

  get modal (): BModal {
    return this.$refs['loading-modal'] as BModal
  }

  mounted () {
    this.$bus.$on('loading:finish', this.hide)
  }

  hide () {
    this.modal && this.modal.hide()
  }
}
</script>

<style lang="scss" scoped>
    ::v-deep {
      .modal {
        .modal-content {
          background: transparent;
          border: none;
        }
      }
      .loading {
        width: 50px;
        height: 50px;
      }
    }
</style>
