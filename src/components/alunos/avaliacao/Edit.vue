<template>
  <b-container>
    <b-row>
      <b-col>
        <Form :aluno="alunoResult" :avaliacao="avaliacaoResult" v-on:form:avaliacao:save="save" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import AlunoAvaliacaoRepository from '@/repository/AlunoAvaliacao'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'

import Form from '@/components/alunos/avaliacao/Form.vue'

@Component({
  components: {
    Form
  }
})
export default class AvaliacaoEdit extends Vue {
  @Prop() private aluno!: number
  @Prop() private avaliacao!: number

  private repository!: AlunoAvaliacaoRepository

  private alunoResult: Aluno = new Aluno()
  private avaliacaoResult: AlunoAvaliacao = new AlunoAvaliacao()

  async beforeMount () {
    const { aluno, id } = this.$route.params

    this.alunoResult = await Repository.Alunos.find(Number(aluno))
    if (!this.aluno) {
      throw Error('Aluno não encontrado')
    }

    this.repository = new Repository.AlunoAvaliacao(this.alunoResult)

    this.avaliacaoResult = await this.repository.find(Number(id))
  }

  @Emit('form:avaliacao:save')
  private async save (aluno: Aluno, avaliacao: AlunoAvaliacao) {
    await this.repository.update(avaliacao, avaliacao.id)

    await this.$router.push({ name: 'alunos.edit', params: { id: String(aluno.id) } })
  }
}
</script>

<style lang="scss" scoped>

</style>