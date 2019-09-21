<template>
  <b-container>
    <b-row>
      <b-col>
        <New :aluno="aluno" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import New from '@/components/alunos/avaliacao/New.vue'

@Component({
  components: {
    New
  }
})
export default class AvaliacaoUpdate extends Vue {
  private aluno: number = 0

  beforeMount () {
    const { aluno } = this.$route.params

    this.aluno = Number(aluno) || 0
  }
}
</script>

<style lang="scss" scoped>

</style>