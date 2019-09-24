<template>
  <b-form v-on:submit.prevent="onSubmit" v-if="newRecord || this.aluno.id">
    <h2>Dados do Aluno - Pré-Cadastro</h2>

    <b-form-group label="Nome:" label-for="input-nome">
      <b-form-input id="input-nome" v-model="aluno.nome" type="text" required />
    </b-form-group>
    <b-form-group label="CPF:" label-for="input-cpf">
      <b-form-input id="input-cpf" v-model="aluno.cpf" type="text" required v-mask="'###.###.###-##'" @change="checkMaskLength($event, 'cpf', 14)" />
    </b-form-group>
    <b-form-group label="Email:" label-for="input-email">
      <b-form-input id="input-email" v-model="aluno.email" type="email" required />
    </b-form-group>
    <b-form-group label="Telefone:" label-for="input-telefone">
      <b-form-input id="input-telefone" v-model="aluno.telefone" type="text" required v-mask="maskTelefone()" @change="checkMaskLength($event, 'telefone', 14)" />
    </b-form-group>
    <b-form-row>
      <b-col>
        <b-form-group label="Cidade:" label-for="input-cidade">
          <b-form-input id="input-cidade" v-model="aluno.cidade" type="text" required />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="UF:" label-for="input-uf">
          <b-select id="input-uf" v-model="aluno.uf" :options="uf">
            <template v-slot:first>
              <option :value="null" disabled>-- Selecione UF --</option>
            </template>
          </b-select>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-button type="submit" variant="primary">Salvar</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'

import { CelularOperadora } from '@/enums/Aluno'
import { UF } from '@/enums/Common'

@Component
export default class FormSimple extends Vue {
  @Prop() private aluno!: Aluno
  @Prop() private newRecord!: boolean

  private telefoneMask: string = '(##) ####-#####?'
  private celularMask: string = '(##) #####-####'

  private get uf () {
    return UF
  }

  private onSubmit () {
    this.$emit('form:save', this.aluno)
  }

  private maskTelefone () {
    return this.aluno.telefone.length === 15 ? this.celularMask : this.telefoneMask
  }

  private checkMaskLength (value: string, key: keyof Aluno, length: number) {
    if (value && value.length !== length) {
      (this.aluno as any)[key] = ''
    }
  }
}
</script>