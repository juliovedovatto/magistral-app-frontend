<template>

  <b-form @submit.prevent="onSubmit()">
    <b-form-group label="Usuário" label-for="input-login" description="Nome de usuário ou endereço de email.">
      <b-form-input id="input-login" v-model="login" type="text" required></b-form-input>
    </b-form-group>
    <b-form-group label="Senha" label-for="input-senha">
      <b-form-input id="input-senha" v-model="senha" type="password" required></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Login</b-button>
  </b-form>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Provide() login: string = ''
  @Provide() senha: string = ''

  private onSubmit () {
    console.log(this.$store.state.token, this.$store.getters.isLoggedIn)

    this.$store.dispatch('login', { login: this.login, senha: this.senha }).then(async response => {
      console.log(this.$store.state.token, this.$store.getters.isLoggedIn)

      await this.$router.push('/')
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
