<template>
  <b-form v-on:submit.prevent="onSubmit">
    <b-form-group label="Nome:" label-for="input-nome">
      <b-form-input id="input-nome" v-model="aluno.nome" type="text" required />
    </b-form-group>
    <b-form-group label="CPF:" label-for="input-cpf">
      <b-form-input id="input-cpf" v-model="aluno.cpf" type="text" required v-mask="'###.###.###-##'" />
    </b-form-group>
    <b-form-group label="Email:" label-for="input-email">
      <b-form-input id="input-email" v-model="aluno.email" type="email" required />
    </b-form-group>
    <b-button type="submit" variant="primary">Salvar</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'

@Component
export default class extends Vue {
  @Prop() private aluno!: Aluno
  @Prop() private newRecord!: boolean

  onSubmit () {
    this.$emit('form:save', this.aluno)
  }
}
</script>