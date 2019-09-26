<template>
  <b-container vif="aluno.id > 0">
    <b-row>
      <b-col>
        <b-button :to="{ name: 'alunos.avaliacao.add', params: { aluno: aluno.id } }">Adicionar Avaliação</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <list :aluno="aluno" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import Repository from '@/repository'
import AlunoAvaliacaoRepository from '@/repository/AlunoAvaliacao'

import List from './avaliacao/List.vue'

@Component({
  components: {
    List
  }
})
export default class Avaliacao extends Vue {
  @Prop() private aluno!: Aluno

  @Emit('form:avaliacao:save')
  private async save (aluno: Aluno, avaliacao: AlunoAvaliacao) {
    const repository = new Repository.AlunoAvaliacao(this.aluno)
    const result = await repository.update(avaliacao, avaliacao.id)

    console.log(result)
  }
}
</script>

<style lang="scss">

</style>