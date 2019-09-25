<template>
  <b-container>
    <b-row v-show="addHistory">
      <b-col>
        <Form :aluno="aluno" @history:form:save="save" ref="form" />
      </b-col>
    </b-row>
    <b-row v-show="!addHistory">
      <b-col>
        <b-button variant="light" @click.prevent="addHistoryAction">Adicionar Histórico</b-button>
      </b-col>
    </b-row>
    <List :aluno="aluno" />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import AlunoRepository from '@/repository/AlunoHistorico'
import AlunoHistorico from '@/models/AlunoHistorico'
import Aluno from '@/models/Aluno'
import Form from './historico/Form.vue'
import List from './historico/List.vue'

@Component({
  components: {
    Form,
    List
  }
})
export default class extends Vue {
  @Prop() private aluno!: Aluno

  private addHistory: boolean = false

  beforeMount () {
    this.$bus.$on('history:form:close', this.closeHistoryForm)
  }

  private addHistoryAction (event: Event) {
    this.addHistory = true

    this.$nextTick(() => {
      const $component = (this.$refs['form'] as Vue).$el
      const $textarea = $component.querySelector('textarea') as HTMLTextAreaElement

      $textarea.focus()
    })
  }

  private closeHistoryForm () {
    this.addHistory = false
  }

  @Emit('hisotry:form:save')
  private async save (entry: string) {
    const repository = new Repository.AlunoHistorico(this.aluno)
    const model = new AlunoHistorico()

    model.texto = entry

    const item = await repository.create(model)

    this.$bus.$emit('history:list:add', item)
    this.$bus.$emit('history:form:clear')

  }
}
</script>

<style lang="scss" scoped>
  .historico-entry {
    .historico {
      font-size: 11px;
    }
  }
</style>