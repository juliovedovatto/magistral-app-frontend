<template>
  <b-form @submit.prevent="onSubmit" v-if="newRecord || formData.id">
    <h2>Dados do Aluno - Pré-Cadastro</h2>

    <b-form-group label="CPF:" label-for="input-cpf">
      <b-form-input id="input-cpf" v-model="cpf" type="text" required v-mask="'###.###.###-##'" @change="checkMaskLength($event, 'cpf', 14); searchAluno($event)" />
    </b-form-group>
    <b-form-group label="Nome:" label-for="input-nome">
      <b-form-input id="input-nome" v-model="formData.nome" type="text" required />
    </b-form-group>
    <b-form-group label="Email:" label-for="input-email">
      <b-form-input id="input-email" v-model="formData.email" type="email" required />
    </b-form-group>
    <b-form-group label="Telefone:" label-for="input-telefone">
      <b-form-input id="input-telefone" v-model="formData.telefone" type="text" required v-mask="maskTelefone()" @change="checkMaskLength($event, 'telefone', 14)" />
    </b-form-group>
    <b-form-row>
      <b-col>
        <b-form-group label="Cidade:" label-for="input-cidade">
          <b-form-input id="input-cidade" v-model="formData.cidade" type="text" required />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="UF:" label-for="input-uf">
          <b-select id="input-uf" v-model="formData.uf" :options="uf">
            <template v-slot:first>
              <option :value="null" disabled>-- Selecione UF --</option>
            </template>
          </b-select>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-button type="submit" variant="primary">
          <v-icon name="save" />
          Salvar
        </b-button>
      </b-col>
      <b-col class="text-right">
        <b-button type="submit" variant="light" @click.prevent="onChangeTipo" v-if="!newRecord">Mudar para Cadastro Completo</b-button>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'

import { TipoCadastro, Status } from '@/enums/Aluno'
import { UF } from '@/enums/Common'
import Repository from '@/repository'
import { DUMMY_CPF } from '../../config';

@Component
export default class FormSimple extends Vue {
  @Prop({ required: true })
  private aluno!: Aluno

  @Prop({ type: Boolean, default: false })
  private new!: boolean

  private telefoneMask: string = '(##) ####-#####?'
  private celularMask: string = '(##) #####-####'
  private formData: Aluno = new Aluno()

  get newRecord (): boolean {
    return this.new
  }

  private get cpf (): string {
    return this.formData.cpf && this.formData.cpf !== DUMMY_CPF && this.formData.cpf || ''
  }

  private get uf () {
    return UF
  }

  private set cpf (value: string) {
    this.formData.cpf = value
  }

  private onSubmit (event: Event) {
    this.$emit('form:save', this.formData)
  }

  private onChangeTipo (event: Event) {
    this.$emit('form:change:tipo', this.formData, TipoCadastro.TIPO_CADASTRADO)
  }

  private maskTelefone () {
    return this.formData.telefone.length === 15 ? this.celularMask : this.telefoneMask
  }

  private checkMaskLength (value: string, key: keyof Aluno, length: number) {
    if (value && value.length !== length) {
      (this.formData as any)[key] = ''
    }
  }

  private async searchAluno (value: string) {
    this.$emit('form:search:cpf', value)
  }

  mounted() {
    this.formData = this.aluno
  }

  @Watch('aluno', { immediate: true })
  onAlunoChange(value: Aluno, oldValue: Aluno) {
    this.formData = value
  }
}
</script>
