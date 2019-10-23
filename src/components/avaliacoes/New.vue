
<template>
  <b-container>
    <b-row v-if="!avaliacao.aluno">
      <b-col>
        <b-form>
          <b-row>
            <b-col cols="10">
              <b-form-group id="avaliacao-aluno" label="Aluno:" label-for="input-1" description="Selecione aluno(a) para realizar a avaliação.">
                <b-form-select id="avaliacao-aluno" v-model="aluno" :options="alunos" :disabled="!alunos.length" />
              </b-form-group>
            </b-col>
            <b-col class="align-items-center">
              <b-button variant="primary" :disabled="!aluno" @click.prevent="onAlunoChange">OK</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <Aluno-Info :aluno="aluno" />
        <Form :avaliacao="avaliacao" @form:avaliacao:save="save" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import { FormSelectOptions } from '@/types/Form'

import AlunoInfo from '@/components/common/AlunoInfo.vue'
import Form from './Form.vue'

@Component({
  components: {
    AlunoInfo,
    Form
  }
})
export default class AvaliacaoNew extends Vue {
  private avaliacao: AlunoAvaliacao = new AlunoAvaliacao()
  private aluno: Nullable<Aluno> = null
  private alunos: FormSelectOptions[] = []

  async beforeMount () {
    const alunos = await Repository.Alunos.getAll()
    this.alunos = alunos.map((aluno): FormSelectOptions => ({ value: aluno, text: aluno.nome }))
  }

  private onAlunoChange (event: Event) {
    if (!this.aluno) {
      return
    }

    this.avaliacao.aluno = this.aluno.id
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
