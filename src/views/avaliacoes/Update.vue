<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <Edit :avaliacao="id" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Edit from '@/components/avaliacoes/Edit.vue'

@Component({
  components: {
    Edit
  }
})
export default class AvaliacaoUpdate extends Vue {
  private id: number = 0

  private beforeMount () {
    const { id } = this.$route.params

    this.id = Number(id) || 0
  }
}
</script>

<style lang="scss" scoped>
</style>
