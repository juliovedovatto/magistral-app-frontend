
<template>
  <b-container>
    <h2>Nova Avaliação</h2>
    <div class="text-center" v-if="!avaliacao.aluno && !fromQuery && !alunoSelected">
      <template v-show="!openModal">
        <b-button variant="primary" size="lg" @click.prevent="showModal()">
          <v-icon name="user" />
          Selecionar Aluno
        </b-button>
        <br>
        <br>
        ou
        <br><br>
        <b-button variant="light" @click.prevent="back()">
          <v-icon name="arrow-left" />
          Voltar
        </b-button>
      </template>

      <AlunoModal title="Nova Avaliação - Selecione o Aluno" :only-tipo-completo="true" @modal:select="setAluno" @modal:close="closeModal" v-if="openModal" />
    </div>
    <b-row v-else>
      <b-col>
        <AlunoInfo :aluno="aluno" />
        <Form :avaliacao="avaliacao" :new-entry=true @form:avaliacao:save="save" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import { FormSelectOptions } from '@/types/Form'

import AlunoInfo from '@/components/common/AlunoInfo.vue'
import AlunoModal from '@/components/alunos/ListModal.vue'
import Form from './Form.vue'

@Component({
  components: {
    AlunoInfo,
    AlunoModal,
    Form
  }
})
export default class AvaliacaoNew extends Vue {
  private aluno: Maybe<Aluno> = null
  private avaliacao: AlunoAvaliacao = new AlunoAvaliacao()
  private openModal: boolean = false
  private fromQuery: boolean = false
  private alunoSelected: boolean = false

  private async beforeMount () {
    const aluno = Number(this.$route.query.aluno) || 0
    if (aluno) {
      this.fromQuery = true

      await this.setAluno({ id: aluno })
    }
  }

  private mounted () {
    !this.avaliacao.aluno && this.$nextTick(this.showModal)
  }

  private showModal () {
    this.openModal = true
  }

  private back () {
    this.$router.push({ name: 'avaliacoes' })
  }

  @Emit('modal:select')
  private async setAluno ({ id }: GenericObject) {
    this.closeModal()

    this.$bus.$emit('loading:start')
    this.aluno = await Repository.Alunos.find(id)
    this.$bus.$emit('loading:finish')

    this.alunoSelected = true
    this.avaliacao.aluno = this.aluno.id
  }

  @Emit('modal:close')
  private closeModal () {
    this.openModal = false
  }

  @Emit('form:avaliacao:save')
  private async save (avaliacao: AlunoAvaliacao) {
    this.$bus.$emit('loading:start')
    await Repository.Avaliacoes.create(avaliacao)
    this.$bus.$emit('loading:finish')

    if (this.fromQuery) {
      const aluno = avaliacao.aluno instanceof Aluno ? avaliacao.aluno.id : avaliacao.aluno
      return this.$router.push({ name: 'alunos.edit', params: { id: String(aluno) }, hash: '#avaliacao' })
    }

    await this.$router.push({ name: 'avaliacoes' })
  }
}
</script>

<style lang="scss" scoped>

</style>
