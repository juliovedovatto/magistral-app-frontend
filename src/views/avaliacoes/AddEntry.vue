<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <NewEntry />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NewEntry from '@/components/avaliacoes/NewEntry.vue'

@Component({
  components: {
    NewEntry
  }
})
export default class AvaliacaoAddEntry extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
