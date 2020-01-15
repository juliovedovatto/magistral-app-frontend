<template>
  <b-form class="formAluno" @submit.prevent="onSubmit" v-if="newRecord || formData.id">
    <h2>Dados do Aluno</h2>

    <b-form-group label="CPF:" label-for="input-cpf">
      <b-form-input id="input-cpf" v-model="cpf" type="text" required v-mask="cpfMask" @change="checkMaskLength($event, 'cpf', 14); searchAluno($event)" />
    </b-form-group>
    <b-form-row>
      <b-col>
        <b-form-group label="Nome:" label-for="input-nome">
          <b-form-input id="input-nome" v-model="formData.nome" type="text" required />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Email:" label-for="input-email">
          <b-form-input id="input-email" v-model="formData.email" type="email" required />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group label="Telefone:" label-for="input-telefone">
          <b-form-input id="input-telefone" v-model="formData.telefone" type="text" required v-mask="maskTelefone()" @change="checkMaskLength($event, 'telefone', 14)" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Celular:" label-for="input-celular">
          <b-form-input id="input-celular" v-model="formData.celular" type="text" required v-mask="celularMask" @change="checkMaskLength($event, 'celular', 15); onCelularChange($event)" />
          <div class="text-right" v-if="showWhatsAppLinkCel">
            <b-link :href="`https://api.whatsapp.com/send?phone=${generateWhatsApp(aluno.celular)}`" target="_blank">
              <small>Abrir conversa no WhatsApp</small>
            </b-link>
          </div>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Whatsapp:" label-for="input-whatsapp">
          <b-form-input id="input-whatsapp" v-model="formData.whatsapp" type="text" required v-mask="celularMask" @change="checkMaskLength($event, 'whatsapp', 15)" @input="onCelularChange($event)" />
          <b-form-row>
            <b-col>
              <b-form-checkbox v-model="whatsapp" value="1" unchecked-value="0" @change="isWhatsappEqual">
                <small>Mesmo que o Celular</small>
              </b-form-checkbox>
            </b-col>
            <b-col class="text-right" v-if="showWhatsAppLink">
              <b-link :href="`https://api.whatsapp.com/send?phone=${generateWhatsApp(aluno.whatsapp)}`" target="_blank">
                <small>Abrir conversa no WhatsApp</small>
              </b-link>
            </b-col>
          </b-form-row>
        </b-form-group>
      </b-col>
    </b-form-row>

    <h3>Informações Adicionais</h3>
    <b-form-row>
      <b-col cols="3">
        <b-form-group label="Data de Nascimento:" label-for="input-dt_nascimento">
          <b-form-input id="input-dt_nascimento" v-model="formData.dt_nascimento" type="text" v-mask="dtMask" @change="checkMaskLength($event, 'dt_nascimento', 10)" />
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group label="Data realização Curso:" label-for="input-dt_curso">
          <b-form-input id="input-dt_curso" v-model="formData.dt_curso" type="text" v-mask="dtMask" @change="checkMaskLength($event, 'dt_curso', 10)" />
        </b-form-group>
      </b-col>
    </b-form-row>

    <h3>Endereço</h3>
    <b-form-row>
      <b-col>
        <b-form-group label="Endereço:" label-for="input-endereco">
          <b-form-input id="input-endereco" v-model="formData.endereco" type="text" required />
        </b-form-group>
        </b-col>
        <b-col>
        <b-form-group label="Complemento:" label-for="input-complemento">
          <b-form-input id="input-complemento" v-model="formData.complemento" type="text" required />
        </b-form-group>
      </b-col>
    </b-form-row>
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
      <b-col>
        <b-form-group label="CEP:" label-for="input-cep">
          <b-form-input id="input-cep" v-model="formData.cep" type="text" required v-mask="'#####-###'" @change="checkMaskLength($event, 'cep', 9)" />
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-button type="submit" variant="primary">
      <v-icon name="save" />
      Salvar
    </b-button>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'

import { UF } from '@/enums/Common'
import { DUMMY_CPF } from '@/config'

@Component
export default class Form extends Vue {
  @Prop({ required: true })
  private aluno!: Aluno

  @Prop({ type: Boolean, default: false })
  private new!: boolean

  private formData: Aluno = new Aluno()

  private cpfMask: string = '###.###.###-##'
  private dtMask: string = '##/##/####'
  private telefoneMask: string = '(##) ####-#####?'
  private celularMask: string = '(##) #####-####'
  private whatsappEqual = 0

  private get newRecord (): boolean {
    return this.new
  }

  private get cpf (): string {
    return this.formData.cpf && this.formData.cpf !== DUMMY_CPF && this.formData.cpf || ''
  }

  private get uf () {
    return UF
  }

  private get whatsapp (): number {
    if (this.formData.celular.length && this.formData.celular === this.formData.whatsapp) {
      this.whatsapp = 1
    }

    return this.whatsappEqual
  }

  private get showWhatsAppLinkCel () {
    return !this.new && this.formData.celular.length >= 14 && this.formData.whatsapp.length < 14
  }

  private get showWhatsAppLink () {
    return !this.new && this.formData.whatsapp.length >= 14
  }

  private get dtNascimento (): Maybe<string> {
    if (!this.validateMaskLength(this.formData.dt_nascimento, 10)) {
      return null
    }

    const dtNascimento = this.formData.dt_nascimento.split('/').reverse().join('-')

    return this.$date(dtNascimento).isValid() && dtNascimento || null
  }

  private get dtCurso (): Maybe<string> {
    if (!this.validateMaskLength(this.formData.dt_curso, 10)) {
      return null
    }

    const dtCurso = this.formData.dt_curso.split('/').reverse().join('-')

    return this.$date(dtCurso).isValid() && dtCurso || null
  }

  private set whatsapp (value) {
    this.whatsappEqual = value
  }

  private set cpf (value) {
    this.formData.cpf = value
  }

  private onSubmit () {
    const aluno = { ...this.formData } as Aluno

    aluno.dt_nascimento = this.dtNascimento || ''
    aluno.dt_curso = this.dtCurso || ''

    this.$emit('form:save', aluno)
  }

  private async searchAluno (value: string) {
    this.$emit('form:search:cpf', value)
  }

  private maskTelefone () {
    return this.formData.telefone.length === 15 ? this.celularMask : this.telefoneMask
  }

  private isWhatsappEqual (checked: string) {
    const isChecked = checked === '1'

    if (isChecked) {
      this.formData.whatsapp = this.formData.celular
    } else {
      this.formData.whatsapp = ''
    }
  }

  private emptyMaskTelefone (value: string) {
    if (value.length < 14) {
      this.formData.telefone = ''
    }
  }

  private emptyMaskCelular (value: string) {
    if (value.length < 15) {
      this.formData.celular = ''
      this.whatsapp = 0
    }
  }

  private emptyMaskWhatsapp (value: string) {
    if (value.length < 15) {
      this.formData.whatsapp = ''
      this.whatsapp = 0
    }
  }

  private validateMaskLength (value: string, length: number) {
    return value && value.length === length
  }

  private checkMaskLength (value: string, key: keyof Aluno, length: number) {
    if (!this.validateMaskLength(value, length)) {
      const replacement: GenericObject = {}

      replacement[key] = ''
      Object.assign(this.formData, replacement)
    }
  }

  private onCelularChange (event: Event) {
    this.whatsapp = Number(this.formData.celular === this.formData.whatsapp)
  }

  private generateWhatsApp (phone: string) {
    return `55${phone.replace(/\D/g, '')}`
  }

  @Watch('aluno', { immediate: true })
  onAluno (aluno: Aluno) {
    if (!aluno) {
      return
    }

    const replacement: GenericObject = {}
    const dtNascimento = aluno.dt_nascimento.split('-').reverse().join('/')
    const dtCurso = aluno.dt_curso.split('-').reverse().join('/')

    replacement.dt_nascimento = dtNascimento
    replacement.dt_curso = dtCurso

    Object.assign(this.formData, aluno, replacement)
  }
}
</script>

<style lang="scss">
.formAluno {
  padding: 10px;
}
</style>
