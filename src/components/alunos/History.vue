<template>
  <b-container>
    <b-row>
      <b-col>
        <Form :aluno="aluno" v-on:form:hisotry:save="save" />
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

  @Emit('form:hisotry:save')
  private async save (entry: string) {
    const repository = new Repository.AlunoHistorico(this.aluno)
    const model = new AlunoHistorico()

    model.texto = entry

    const item = await repository.create(model)

    this.$bus.$emit('history:list:add', item)
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