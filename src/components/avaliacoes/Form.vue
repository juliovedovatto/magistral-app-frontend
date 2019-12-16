<template>
  <b-form v-on:submit.prevent="onSubmit" v-if="formData.aluno">
    <b-form-group label="Protocolo:" label-for="input-protocolo" v-show="isStatusEntrada">
      <b-input id="input-protocolo" v-model="formData.protocolo" type="number" :readonly="newEntry" />
      <template v-slot:description v-if="newEntry">
        Protocolo será gerado ao salvar Avaliação
      </template>
    </b-form-group>
    <b-form-group label="Protocolo" v-if="!isStatusEntrada">
      {{ formData.protocolo }}
    </b-form-group>

    <AlertMessage type="warning" :close="false" v-if="isStatusEntrada">
      <p><strong>ATENÇÃO</strong></p>
      <p>Esta avaliação está com status <strong>ENTRADA DE AMOSTRA</strong>.
        Para trabalhar nesta avaliação, será necessário mudar o status dela para os informados abaixo.</p>
    </AlertMessage>
    <b-form-group label="Status:" label-for="input-status">
      <b-form-select id="input-status" v-model="formData.status" required :options="statuses" />
    </b-form-group>
    <b-form-group label="Avaliação:" label-for="input-texto">
      <editor id="input-texto" :content="formData.texto" v-on:update:editor="onUpdateContent" />
    </b-form-group>
    <b-form-group label="Vídeo:" label-for="input-video">
      <b-input id="input-texto" v-model="formData.video" type="url" />
    </b-form-group>

    <b-button type="submit" variant="primary">
      <v-icon name="save" />
      Salvar
    </b-button>
  </b-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'

import { Status, StatusLabels } from '@/enums/Avaliacao'
import { FormSelectOptions } from '@/types/Form'

import Editor from '@/components/common/Editor.vue'

@Component({
  components: {
    Editor
  }
})
export default class Form extends Vue {
  @Prop({ required: true })
  private avaliacao!: AlunoAvaliacao

  @Prop({ type: Boolean, default: false })
  private newEntry!: boolean

  private formData: AlunoAvaliacao = new AlunoAvaliacao()

  private beforeMount () {
    this.formData = this.avaliacao
  }

  get statuses (): FormSelectOptions[] {
    const options: FormSelectOptions[] = [ { value: null, text: '-- SELECIONE --' } ]

    let statuses: Status[] = []
    if (this.newEntry) {
      statuses.push(...[ Status.NAO_AVALIADO, Status.ENTRADA ])
    } else {
      statuses.push(...[ Status.NAO_AVALIADO, Status.APROVADO, Status.REPROVADO ])
    }

    const selectOptions = Object.entries(StatusLabels)
        .filter(([ status, _ ]) => statuses.includes(Number(status)))
        .map(([ status, label ]): FormSelectOptions => ({ value: status, text: label as string }))

    return options.concat(selectOptions)
  }

  get isStatusEntrada () {
    return Number(this.formData.status) === Status.ENTRADA
  }

  private async onSubmit () {
    this.$emit('form:avaliacao:save', this.formData)
  }

  @Emit('update:editor')
  private onUpdateContent (content: string) {
    this.formData.texto = content
  }
}
</script>

<style lang="scss" scoped>

</style>
