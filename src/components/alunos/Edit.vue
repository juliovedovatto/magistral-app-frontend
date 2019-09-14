<template>
  <b-tabs v-model="tabIndex" justified @input="updateTab">
    <b-tab id="dados" title="Dados do Aluno">
      <Form :aluno="aluno" v-on:form:save="save" />
    </b-tab>
    <b-tab id="historico" title="Histórico">
      <History :aluno="aluno" v-if="aluno.id > 0" />
    </b-tab>
    <b-tab id="avaliacao" title="Avaliação">
      <Review :aluno="aluno" v-if="aluno.id > 0" />
    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import Form from './Form.vue'
import History from './History.vue'
import Review from './Review.vue'

@Component({
  components: {
    Form,
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

  async beforeMount () {
    const currentTab = this.getHash() || 'dados'
    const tabIndex = this.tabs.indexOf(currentTab)

    await this.updateTab(this.tabIndex >= 0 && tabIndex || 0)
    await this.getAluno()
  }

  private async getAluno () {
    const result = await Repository.Alunos.find(this.id)

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
    await Repository.Alunos.update(this.aluno, this.id)
    await this.$router.push({ name: 'alunos' })
  }
}
</script>