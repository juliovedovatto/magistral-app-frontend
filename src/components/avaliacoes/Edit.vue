<template>
  <b-container>
    <b-row>
      <b-col>
        <Aluno-Info :aluno="alunoInstance" />
        <Form :avaliacao="avaliacaoResult" v-on:form:avaliacao:save="save" v-if="avaliacaoResult" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'

import AlunoInfo from '@/components/common/AlunoInfo.vue'
import Form from '@/components/avaliacoes/Form.vue'

@Component({
  components: {
    AlunoInfo,
    Form
  }
})
export default class AvaliacaoEdit extends Vue {
  @Prop({ required: true, type: Number })
  private avaliacao!: number

  private alunoInstance: Maybe<Aluno> = null
  private avaliacaoResult: Maybe<AlunoAvaliacao> = null

  async beforeMount () {
    this.$bus.$emit('loading:start')
    const avaliacao = await Repository.Avaliacoes.find(this.avaliacao)
    this.$bus.$emit('loading:finish')
    if (!avaliacao) {
      throw new Error('Aluno não encontrado')
    }

    this.alunoInstance = avaliacao.aluno instanceof Aluno ? avaliacao.aluno : await Repository.Alunos.find(avaliacao.aluno as number)

    this.avaliacaoResult = avaliacao
  }

  @Emit('form:avaliacao:save')
  private async save (avaliacao: AlunoAvaliacao) {
    await Repository.Avaliacoes.update(avaliacao, avaliacao.id)

    const origin = this.$route.query && this.$route.query.from as string || ''
    if (origin === 'alunos.edit') {
      const aluno = avaliacao.aluno instanceof Aluno ? avaliacao.aluno.id : avaliacao.aluno
      return this.$router.push({ name: 'alunos.edit', params: { id: String(aluno) }, hash: '#avaliacao' })
    }

    await this.$router.push({ name: 'avaliacoes' })
  }
}
</script>

<style lang="scss" scoped>
</style>
