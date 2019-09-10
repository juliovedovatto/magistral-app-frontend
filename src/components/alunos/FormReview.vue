<template>
  <b-form v-on:submit.prevent="onSubmit">
    <b-form-group label="Status:" label-for="input-status">
      <b-form-select id="input-status" v-model="avaliacao.status" :options="statuses" />
    </b-form-group>
    <b-form-group label="Avaliação:" label-for="input-texto">
      <b-textarea id="input-texto" v-model="avaliacao.texto" />
    </b-form-group>
    <b-form-group label="Vídeo:" label-for="input-video">
      <b-input id="input-texto" v-model="avaliacao.video" type="url" />
    </b-form-group>

    <b-button type="submit" variant="primary">Salvar</b-button>
  </b-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'

@Component
export default class FormReview extends Vue {
  @Prop() private aluno!: Aluno
  @Prop() private avaliacao!: AlunoAvaliacao

  private statuses: Object[] = [
    { value: 0, text: 'Não Avaliado' },
    { value: 1, text: 'Aprovado' },
    { value: 2, text: 'Reprovado' }
  ]

  private async onSubmit () {
    this.$emit('form:avaliacao:save', this.aluno, this.avaliacao)
  }
}
</script>

<style lang="scss" scoped>

</style>