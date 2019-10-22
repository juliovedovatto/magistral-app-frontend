
<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-group id="avaliacao-aluno" label="Aluno:" label-for="input-1" description="Selecione aluno(a) para realizar a avaliação.">
        <b-form-select id="avaliacao-aluno" v-model="avaliacao.aluno" :options="alunos" :disabled="!alunos.length" />
      </b-form-group>
      </b-col>
    </b-row>
    <b-row v-if="avaliacao.aluno">
      <b-col>
        <Form :avaliacao="avaliacao" @form:avaliacao:save="save" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import { FormSelectOptions } from '@/types/Form'

import Form from './Form.vue'

@Component({
  components: {
    Form
  }
})
export default class AvaliacaoNew extends Vue {
  private avaliacao: AlunoAvaliacao = new AlunoAvaliacao()
  private aluno: Aluno = new Aluno()
  private alunos: FormSelectOptions[] = []

  async beforeMount () {
    const alunos = await Repository.Alunos.getAll()

    this.alunos = alunos.map((aluno): FormSelectOptions => ({ value: aluno.id, text: aluno.nome }))
  }

  @Emit('form:avaliacao:save')
  private async save (avaliacao: AlunoAvaliacao) {
    await Repository.Avaliacoes.create(avaliacao)

    await this.$router.push({ name: 'avaliacoes' })
  }
}
</script>

<style lang="scss" scoped>

</style>
