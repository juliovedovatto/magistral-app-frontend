<template>
  <b-form v-on:submit.prevent="onSubmit">
    <b-form-group label="Nome:" label-for="input-nome">
      <b-form-input id="input-nome" v-model="usuario.nome" type="text" required />
    </b-form-group>
    <b-form-group label="Email:" label-for="input-email">
      <b-form-input id="input-email" v-model="usuario.email" type="email" required />
    </b-form-group>
    <b-form-group label="Login:" label-for="input-login">
      <b-form-input id="input-login" v-model="usuario.login" type="text" required />
    </b-form-group>
    <b-form-group label="Senha:" label-for="input-senha">
      <b-form-input id="input-senha" v-model="usuario.senha" type="password" />
    </b-form-group>
    <div v-if="!newRecord">
      <b-form-group label="Status:" label-for="input-status">
        <b-form-input id="input-status" v-model="usuario.status" type="text" />
      </b-form-group>
    </div>
    <b-form-group label="Nível:" label-for="input-nivel">
        <b-form-input id="input-nivel" v-model="usuario.nivel" type="text" />
      </b-form-group>
    <b-button type="submit" variant="primary">Salvar</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Usuario from '@/models/Usuario'

@Component
export default class extends Vue {
  @Prop() private usuario!: Usuario
  @Prop() private newRecord!: boolean

  onSubmit () {
    this.$emit('form:save', this.usuario)
  }
}
</script>