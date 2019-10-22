<template>
  <b-form v-on:submit.prevent="onSubmit" v-if="formData.aluno">
    <b-form-group label="Status:" label-for="input-status">
      <b-form-select id="input-status" v-model="formData.status" :options="statuses" />
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

import { StatusLabels } from '@/enums/Avaliacao'
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

  private formData: AlunoAvaliacao = new AlunoAvaliacao()

  private beforeMount () {
    this.formData = this.avaliacao
  }

  get statuses (): FormSelectOptions[] {
    const options: FormSelectOptions[] = [ { value: null, text: '-- SELECIONE --' } ]
    const selectOptions = Object.entries(StatusLabels)
        .map((status: any[]): FormSelectOptions => ({ value: status[0], text: status[1] }))

    return options.concat(selectOptions)
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
