<template>
  <b-tabs justified>
    <b-tab title="Dados do Aluno" active>
      <Form :aluno="aluno" v-on:form:save="save" />
    </b-tab>
    <b-tab title="Histórico">
      <History :aluno="aluno" v-if="aluno.id > 0" />
    </b-tab>
    <b-tab title="Avaliação">

    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import Form from './Form.vue'
import History from './History.vue'

@Component({
  components: {
    Form,
    History
  }
})
export default class extends Vue {
  @Prop() private id!: number

  private aluno: Aluno = new Aluno()

  async beforeMount () {
    await this.getAluno()
  }

  private async getAluno () {
    const result = await Repository.Alunos.find(this.id)

    this.aluno = result
  }

  @Emit('form:save')
  async save () {
    await Repository.Alunos.update(this.aluno, this.id)
    await this.$router.push({ name: 'alunos' })
  }
}
</script>