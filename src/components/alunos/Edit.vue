<template>
  <b-container class="editAluno">
    <b-row no-gutters>
      <b-col>
        <b-button variant="primary" :to="{ name: 'alunos' }">
          <v-icon name="arrow-left" />
          Voltar para Listagem
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <b-tabs v-model="tabIndex" justified :class="tabs" @input="updateTab" v-if="this.aluno.id > 0">
          <b-tab id="dados" title="Dados do Aluno" class="pt-2">
            <AlertMessage :type="feedbackMessage.type" :message="feedbackMessage.message" v-if="feedbackMessage" />

            <Form :aluno="aluno" @form:save="save" v-if="isDetailed" />
            <FormSimple :aluno="aluno" @form:save="save" @form:change:tipo="changeTipo" v-else-if="isSimple" />
          </b-tab>
          <b-tab id="historico" title="Histórico" class="pt-2">
            <History :aluno="aluno" />
          </b-tab>
          <b-tab id="avaliacao" title="Avaliação" :disabled="isSimple" class="pt-2">
            <Review :aluno="aluno" v-if="isDetailed" />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import Aluno from '@/models/Aluno'

import Form from './Form.vue'
import FormSimple from './FormSimple.vue'
import History from './History.vue'
import Review from './Review.vue'
import { TipoCadastro } from '@/enums/Aluno'
import createFeedbackMessage, { feedbackInfoMessage, feedbackSuccessMessage } from '@/utils/create-feedback-message'

@Component({
  components: {
    Form,
    FormSimple,
    History,
    Review
  }
})
export default class Edit extends Vue {
  @Prop() private id!: number

  private tabIndex: number = 0
  private aluno: Aluno = new Aluno()
  private tabs: String[] = [
    'dados', 'historico', 'avaliacao'
  ]
  private feedbackMessage: Maybe<FeedbackMessage> = null

  get isDetailed (): boolean {
    return this.aluno.tipo_cadastro === TipoCadastro.TIPO_CADASTRADO
  }

  get isSimple (): boolean {
    return this.aluno.tipo_cadastro === TipoCadastro.PRE_CADASTRO
  }

  async beforeMount () {
    const currentTab = this.getHash() || 'dados'
    const tabIndex = this.tabs.indexOf(currentTab)

    await this.updateTab(this.tabIndex >= 0 && tabIndex || 0)
    await this.getAluno()
  }

  private async getAluno () {
    this.$bus.$emit('loading:start')
    const result = await Repository.Alunos.find(this.id)
    this.$bus.$emit('loading:finish')

    this.aluno = result
  }

  private async updateTab (tabIndex: number) {
    this.tabIndex = tabIndex

    const tab = this.tabs[tabIndex]
    if (this.getHash() !== tab) {
      await this.$router.push({ hash: `#${tab}` })
    }
  }

  private getHash (): string {
    return this.$route.hash.replace('#', '')
  }

  @Emit('form:save')
  async save () {
    this.feedbackMessage = null

    this.$bus.$emit('loading:start')
    await Repository.Alunos.update(this.aluno, this.id)
    this.$bus.$emit('loading:finish')

    this.feedbackMessage = feedbackSuccessMessage('Dados do Aluno salvaos com sucesso.')
  }

  @Emit('form:change:tipo')
  async changeTipo (aluno: Aluno, tipo: TipoCadastro) {
    this.aluno.tipo_cadastro = tipo
    this.aluno = aluno
    this.feedbackMessage = feedbackInfoMessage('Atenção: É necessário salvar alterações para que cadastro seja considerado completo.')
  }
}
</script>

<style lang="scss">
.editAluno {
  .tabs {
    margin: 20px 0;
  }
}
</style>
