<template>
  <b-form v-on:submit.prevent="onSubmit">
    <h2>Dados do Aluno</h2>

    <b-form-group label="Nome:" label-for="input-nome">
      <b-form-input id="input-nome" v-model="aluno.nome" type="text" required />
    </b-form-group>
    <b-form-group label="CPF:" label-for="input-cpf">
      <b-form-input id="input-cpf" v-model="aluno.cpf" type="text" required v-mask="'###.###.###-##'" />
    </b-form-group>
    <b-form-group label="Email:" label-for="input-email">
      <b-form-input id="input-email" v-model="aluno.email" type="email" required />
    </b-form-group>
    <b-form-group label="Telefone:" label-for="input-telefone">
      <b-form-input id="input-telefone" v-model="aluno.telefone" type="text" required v-mask="maskTelefone()" @change="checkMaskLength($event, 'telefone', 14)" />
    </b-form-group>
    <b-form-row>
      <b-col>
        <b-form-group label="Celular:" label-for="input-celular">
          <b-form-input id="input-celular" v-model="aluno.celular" type="text" required v-mask="celularMask" @change="checkMaskLength($event, 'celular', 15)" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Operadora:" label-for="input-celular_operadora">
          <b-select v-model="aluno.celular_operadora" :options="operadoras">
            <template v-slot:first>
              <option :value="null" disabled>-- Selecione Operadora --</option>
            </template>
          </b-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Whatsapp:" label-for="input-whatsapp">
          <b-form-input id="input-whatsapp" v-model="aluno.whatsapp" type="text" required v-mask="celularMask" @change="checkMaskLength($event, 'whatsapp', 15)" />
          <b-form-checkbox v-model="whatsapp" value="1" unchecked-value="0" @change="isWhatsappEqual">Mesmo que o Celular</b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-form-row>

    <h3>Endereço</h3>
    <b-form-row>
      <b-col>
        <b-form-group label="Endereço:" label-for="input-endereco">
          <b-form-input id="input-endereco" v-model="aluno.endereco" type="text" required />
        </b-form-group>
        </b-col>
        <b-col>
        <b-form-group label="Complemento:" label-for="input-complemento">
          <b-form-input id="input-complemento" v-model="aluno.complemento" type="text" required />
        </b-form-group>
      </b-col>
    </b-form-row>
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
      <b-col>
        <b-form-group label="CEP:" label-for="input-cep">
          <b-form-input id="input-cep" v-model="aluno.cep" type="text" required v-mask="'#####-###'" @change="checkMaskLength($event, 'cep', 9)" />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-button type="submit" variant="primary">Salvar</b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'

enum CelularOperadora {
  TIM = 'TIM',
  VIVO = 'VIVO',
  CLARO = 'CLARO',
  OI= 'OI',
  NEXTEL = 'NEXTEL',
  CORREIOS = 'CORREIOS',
  OUTROS = 'OUTROS',
  DESCONHECIDO = 'DESCONHECIDO'
}

enum UF {
  AC = 'Acre',
  AL = 'Alagoas',
  AP = 'Amapá',
  AM = 'Amazonas',
  BA = 'Bahia',
  CE = 'Ceará',
  DF = 'Distrito Federal',
  ES = 'Espírito Santo',
  GO = 'Goiás',
  MA = 'Maranhão',
  MT = 'Mato Grosso',
  MS = 'Mato Grosso do Sul',
  MG = 'Minas Gerais',
  PA = 'Pará',
  PB = 'Paraíba',
  PR = 'Paraná',
  PE = 'Pernambuco',
  PI = 'Piauí',
  RJ = 'Rio de Janeiro',
  RN = 'Rio Grande do Norte',
  RS = 'Rio Grande do Sul',
  RO = 'Rondônia',
  RR = 'Roraima',
  SC = 'Santa Catarina',
  SP = 'São Paulo',
  SE = 'Sergipe',
  TO = 'Tocantins'
}

enum TipoCadastro {
  PRE_CADASTRO = 0,
  TIPO_CADASTRADO = 1,
  TIPO_CANCELADO = 2
}

@Component
export default class Form extends Vue {
  @Prop() private aluno!: Aluno
  @Prop() private newRecord!: boolean

  private telefoneMask: string = '(##) ####-#####?'
  private celularMask: string = '(##) #####-####'
  private whatsappEqual = 0

  private get operadoras () {
    return CelularOperadora
  }

  private get uf () {
    return UF
  }

  private get whatsapp (): number {
    if (this.aluno.celular === this.aluno.whatsapp) {
      this.whatsapp = 1
    }

    return this.whatsappEqual
  }

  private set whatsapp (value) {
    this.whatsappEqual = value
  }

  private onSubmit () {
    this.$emit('form:save', this.aluno)
  }

  private maskTelefone () {
    return this.aluno.telefone.length === 15 ? this.celularMask : this.telefoneMask
  }

  private isWhatsappEqual (checked: string) {
    const isChecked = checked === '1'

    if (isChecked) {
      this.aluno.whatsapp = this.aluno.celular
    } else {
      this.aluno.whatsapp = ''
    }
  }

  private emptyMaskTelefone (value: string) {
    if (value.length < 14) {
      this.aluno.telefone = ''
    }
  }

  private emptyMaskCelular (value: string) {
    if (value.length < 15) {
      this.aluno.celular = ''
      this.whatsapp = 0
    }
  }

  private emptyMaskWhatsapp (value: string) {
    if (value.length < 15) {
      this.aluno.whatsapp = ''
      this.whatsapp = 0
    }
  }

  private checkMaskLength (value: string, key: string, length: number) {
    if (value.length !== length) {
      this.aluno[key] = ''
    }
  }
}
</script>