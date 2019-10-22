<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <New />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import New from '@/components/avaliacoes/New.vue'

@Component({
  components: {
    New
  }
})
export default class AvaliacaoAdd extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
