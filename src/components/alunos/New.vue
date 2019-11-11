<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <b-button variant="primary" :to="{ name: 'alunos' }">
          <v-icon name="arrow-left" />
          Voltar para Listagem
        </b-button>
        <b-button variant="light" class="ml-2" @click.prevent="newRecord" v-if="tipo !== -1">
          <v-icon name="plus" />
          Novo Cadastro
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters class="mt-3" v-if="this.notSelected">
      <b-col>
        <b-form-group label="Tipo de Cadastro" label-for="input-tipo">
          <b-select id="input-tipo" v-model.number="tipo" :options="tipos">
            <template v-slot:first>
              <option :value="null" disabled>-- Selecione Tipo --</option>
            </template>
          </b-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row no-gutters class="mt-3">
      <b-col>
        <AlertMessage :type="feedbackMessage.type" :message="feedbackMessage.message" v-if="feedbackMessage" />
        <Form :aluno="aluno" :new=true @form:save="save" v-if="isDetailed" />
        <FormSimple :aluno="aluno" :new=true v-on:form:save="save" v-else-if="isSimple" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import objectFilter from '@/utils/object-filter'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import { TipoCadastro, TipoCadastroLabels } from '@/enums/Aluno'

import Form from './Form.vue'
import FormSimple from './FormSimple.vue'
import { feedbackErrorMessage } from '../../utils/create-feedback-message'


@Component({
  components: {
    Form,
    FormSimple
  }
})
export default class extends Vue {
  private aluno: Aluno = new Aluno()
  private tipo: number = -1

  private feedbackMessage: Maybe<FeedbackMessage> = null

  get notSelected (): boolean {
    return this.tipo === -1
  }

  get isDetailed (): boolean {
    return this.tipo === TipoCadastro.TIPO_CADASTRADO
  }

  get isSimple (): boolean {
    return this.tipo === TipoCadastro.PRE_CADASTRO
  }

  get tipos () {
    return objectFilter(TipoCadastroLabels, (value: string, tipo: number) => Number(tipo) !== TipoCadastro.TIPO_CANCELADO)
  }

  private newRecord (event: Event) {
    this.tipo = -1
  }

  @Emit('form:save')
  async save (aluno: Aluno) {
    this.feedbackMessage = null

    if (!TipoCadastro[this.tipo]) {
      throw new Error('Tipo inválido')
    }

    aluno.tipo_cadastro = this.tipo

    this.$bus.$emit('loading:start')
    const result = await Repository.Alunos.create(aluno)
    this.$bus.$emit('loading:finish')

    console.log(result.constructor())

    if (result && (result instanceof Object)) {
      const { id } = result as Aluno
      await this.$router.push({ name: 'alunos.edit', params: { id: id.toString() } })
    } else {
      this.feedbackMessage = feedbackErrorMessage('Ocorreu um erro ao criar novo Aluno')
    }
  }
}
</script>
