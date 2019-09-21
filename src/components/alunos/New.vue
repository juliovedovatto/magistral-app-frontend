<template>
  <Form :aluno="aluno" newRecord="true" v-on:form:save="save" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import Form from './Form.vue'

@Component({
  components: {
    Form
  }
})
export default class extends Vue {
  private aluno: Aluno = new Aluno()

  @Emit('form:save')
  async save () {
    await Repository.Alunos.create(this.aluno)
    await this.$router.push({ name: 'alunos' })
  }
}
</script>