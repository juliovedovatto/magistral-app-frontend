<template>
  <b-form class="formAluno" @submit.prevent="onSubmit" v-if="newRecord || this.aluno.id">
    <h2>Dados do Aluno</h2>

    <b-form-group label="Nome:" label-for="input-nome">
      <b-form-input id="input-nome" v-model="aluno.nome" type="text" required />
    </b-form-group>
    <b-form-row>
      <b-col>
        <b-form-group label="CPF:" label-for="input-cpf">
          <b-form-input id="input-cpf" v-model="aluno.cpf" type="text" required v-mask="'###.###.###-##'" @change="checkMaskLength($event, 'cpf', 14)" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Email:" label-for="input-email">
          <b-form-input id="input-email" v-model="aluno.email" type="email" required />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group label="Telefone:" label-for="input-telefone">
          <b-form-input id="input-telefone" v-model="aluno.telefone" type="text" required v-mask="maskTelefone()" @change="checkMaskLength($event, 'telefone', 14)" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Celular:" label-for="input-celular">
          <b-form-input id="input-celular" v-model="aluno.celular" type="text" required v-mask="celularMask" @change="checkMaskLength($event, 'celular', 15); onCelularChange($event)" />
          <div class="text-right" v-if="showWhatsAppLinkCel">
            <b-link :href="`https://api.whatsapp.com/send?phone=${generateWhatsApp(aluno.celular)}`" target="_blank">
              <small>Abrir conversa no WhatsApp</small>
            </b-link>
          </div>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Whatsapp:" label-for="input-whatsapp">
          <b-form-input id="input-whatsapp" v-model="aluno.whatsapp" type="text" required v-mask="celularMask" @change="checkMaskLength($event, 'whatsapp', 15)" @input="onCelularChange($event)" />
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

@Component
export default class Form extends Vue {
  @Prop({ required: true })
  private aluno!: Aluno

  @Prop({ type: Boolean, default: false })
  private new!: boolean

  private telefoneMask: string = '(##) ####-#####?'
  private celularMask: string = '(##) #####-####'
  private whatsappEqual = 0

  private get newRecord (): boolean {
    return this.new
  }

  private get uf () {
    return UF
  }

  private get whatsapp (): number {
    if (this.aluno.celular.length && this.aluno.celular === this.aluno.whatsapp) {
      this.whatsapp = 1
    }

    return this.whatsappEqual
  }

  get showWhatsAppLinkCel () {
    return !this.new && this.aluno.celular.length >= 14 && this.aluno.whatsapp.length < 14
  }

  get showWhatsAppLink () {
    return !this.new && this.aluno.whatsapp.length >= 14
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

  private checkMaskLength (value: string, key: keyof Aluno, length: number) {
    if (value && value.length !== length) {
      (this.aluno as any)[key] = ''
    }
  }

  private onCelularChange (event: Event) {
    this.whatsapp = Number(this.aluno.celular === this.aluno.whatsapp)
  }

  private generateWhatsApp (phone: string) {
    return `55${phone.replace(/\D/g, '')}`
  }
}
</script>

<style lang="scss">
.formAluno {
  padding: 10px;
}
</style>
