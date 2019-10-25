<template>
  <b-form class="login-form" @submit.prevent="onSubmit()">
    <AlertMessage :type="feedbackMessage.type" :message="feedbackMessage.message" v-if="feedbackMessage" />

    <b-form-group label="Usuário" label-for="input-login" description="Nome de usuário ou endereço de email.">
      <b-form-input id="input-login" v-model="login" type="text" required />
    </b-form-group>
    <b-form-group label="Senha" label-for="input-senha">
      <b-form-input id="input-senha" v-model="senha" type="password" required />
    </b-form-group>

    <b-button type="submit" variant="primary" :disabled="loading">
      <b-spinner class="mr-2" small v-show="loading"></b-spinner>
      Login
    </b-button>
  </b-form>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'

import { feedbackErrorMessage, feedbackSuccessMessage } from '@/utils/create-feedback-message'

@Component
export default class Login extends Vue {
  // TODO: remover valores default
  @Provide() login: string = 'admin'
  @Provide() senha: string = '123456'

  private loading = false
  private feedbackMessage: Maybe<FeedbackMessage> = null

  private async onSubmit () {
    this.loading = true
    this.feedbackMessage = null

    try {
      const response = await this.$store.dispatch('login', { login: this.login, senha: this.senha })
      this.feedbackMessage = feedbackSuccessMessage('Login  realizado com sucesso, redirecionando para página de login.')

      setTimeout(async () => {
        await this.$router.push('/')
      }, 2000)
    } catch (err) {
      this.feedbackMessage = feedbackErrorMessage('Erro ao realizar login. Verifique credenciais e tente novamente.')
    }

    this.loading = false
  }
}
</script>

<style lang="scss">
</style>
