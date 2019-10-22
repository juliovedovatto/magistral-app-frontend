<template>
  <b-container>
    <b-row>
      <b-col>
        <Form :aluno="alunoInstance" :avaliacao="avaliacaoResult" v-on:form:avaliacao:save="save" v-if="alunoInstance && avaliacaoResult" />
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

import Form from '@/components/avaliacoes/Form.vue'

@Component({
  components: {
    Form
  }
})
export default class AvaliacaoEdit extends Vue {
  @Prop() private aluno!: number
  @Prop() private avaliacao!: number

  private repository!: AlunoAvaliacaoRepository

  private alunoInstance: Nullable<Aluno> = null
  private avaliacaoResult: Nullable<AlunoAvaliacao> = null

  async beforeMount () {
    const { aluno, id } = this.$route.params

    this.alunoInstance = await Repository.Alunos.find(Number(aluno))
    if (!this.aluno) {
      throw Error('Aluno não encontrado')
    }

    this.repository = new Repository.AlunoAvaliacao(this.alunoInstance)
    this.avaliacaoResult = await this.repository.find(Number(id))
  }

  @Emit('form:avaliacao:save')
  private async save (aluno: Aluno, avaliacao: AlunoAvaliacao) {
    await this.repository.update(avaliacao, avaliacao.id)

    await this.$router.push({ name: 'alunos.edit', params: { id: String(aluno.id) }, hash: '#avaliacao' })
  }
}
</script>

<style lang="scss" scoped>
</style>
