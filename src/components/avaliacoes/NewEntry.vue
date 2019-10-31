
<template>
  <b-container>
    <h2>Entrada de Amostra</h2>
    <b-form class="mt-5">
      <b-form-row class="border-bottom border-dark pb-3 mt-3" v-for="(entry, index) in entries" :key="`entry-${index}`">
        <b-col class="text-center" cols="1">
          <b-badge variant="primary" pill>{{ index + 1 }}</b-badge>
        </b-col>
        <b-col>
          <b-form-group label="Aluno" :label-for="`entry-nome-${index}`">
            <b-form-input :id="`entry-nome-${index}`" v-model="entry.nome" readonly />
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Protocolo" :label-for="`entry-protocolo-${index}`">
            <b-form-input :id="`entry-protocolo-${index}`" v-model="entry.protocolo" />
          </b-form-group>
        </b-col>
        <b-col class="text-right" cols="1">
          <b-button class="action" variant="outline-secondary" size="sm" @click.prevent="remove(index, $event)">
            <v-icon name="trash" />
          </b-button>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-button variant="light" class="mt-5" @click.prevent="addEntry">
            <v-icon name="plus" />
            Adicionar Entrada de Amostra
          </b-button>
        </b-col>
        <b-col class="text-right">
          <b-button variant="primary" class="mt-5" @click.prevent="save">
            <v-icon name="save" />
            Cadastrar Entradas
          </b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import { FormSelectOptions } from '@/types/Form'

import AlunoInfo from '@/components/common/AlunoInfo.vue'
import AlunoModal from '@/components/alunos/ListModal.vue'
import { AvaliacaoStatus } from '@/enums/Aluno'

import Form from './Form.vue'

interface AvaliacaoEntry {
  aluno: number,
  nome: string,
  protocolo: string
}

@Component({
  components: {
    AlunoInfo,
    AlunoModal,
    Form
  }
})
export default class AvaliacaoNew extends Vue {
  private entries: AvaliacaoEntry[] = []

  private beforeMount () {
    this.add()
  }

  private add () {
    this.entries.push({
      aluno: 0,
      nome: '',
      protocolo: ''
    })
  }

  private addEntry (e: Event) {
    this.add()
  }

  private save () {
    const entries = this.entries.map(entry => {
      const avaliacao = new AlunoAvaliacao()

      avaliacao.aluno = entry.aluno
      avaliacao.status = AvaliacaoStatus.STATUS_NAO_AVALIADO

      return avaliacao
    })

    // Repository.Avaliacoes.createEntries()
  }

  private remove (index: number, e: Event) {
    if (this.entries.length === 1) {
      const entry = this.entries[0]

      entry.aluno = 0
      entry.nome = ''
      entry.protocolo = ''
      return
    }

    this.$delete(this.entries, index)
  }

  @Emit('modal:select')
  private async setAluno (id: number) {
    this.closeModal()

    // this.$bus.$emit('loading:start')
    // this.aluno = await Repository.Alunos.find(id)
    // this.$bus.$emit('loading:finish')

    // this.alunoSelected = true
    // this.avaliacao.aluno = this.aluno.id
  }

  @Emit('modal:close')
  private closeModal () {
    // this.openModal = false
  }


}
</script>

<style lang="scss" scoped>

</style>
