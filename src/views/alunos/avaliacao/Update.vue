<template>
  <b-container>
    <b-row>
      <b-col>
        <Edit :aluno="this.aluno" :id="this.id" v-if="this.aluno && this.id" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Edit from '@/components/alunos/avaliacao/Edit.vue'

@Component({
  components: {
    Edit
  }
})
export default class AvaliacaoUpdate extends Vue {
  private aluno: number = 0
  private id: number = 0

  beforeMount () {
    this.aluno = Number(this.$route.params.aluno) || 0
    this.id = Number(this.$route.params.id) || 0
  }
}
</script>

<style lang="scss" scoped>

</style>