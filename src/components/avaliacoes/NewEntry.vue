
<template>
  <b-container class="new-entry">
    <h2>Entrada de Amostra</h2>
    <b-form class="mt-5">
      <b-form-row class="border-bottom border-dark pb-3 mt-3" v-for="(entry, index) in entries" :key="`entry-${index}`">
        <b-col class="d-flex align-items-end justify-content-center pb-3" cols="1">
          <b-badge variant="primary" pill>{{ index + 1 }}</b-badge>
        </b-col>
        <b-col>
          <b-form-group label="Aluno" :label-for="`entry-nome-${index}`">
            <b-form-input :id="`entry-nome-${index}`" v-model="entry.nome" readonly />
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="Protocolo" :label-for="`entry-protocolo-${index}`">
            <b-form-input :id="`entry-protocolo-${index}`" v-model="entry.protocolo" type="number"  />
          </b-form-group>
        </b-col>
        <b-col class="d-flex align-items-end justify-content-end" cols="2">
          <b-button-group size="sm">
            <b-button class="action" variant="outline-secondary" @click.prevent="search(index, $event)">
              <v-icon name="user" />
            </b-button>
            <b-button class="action" variant="outline-secondary" @click.prevent="remove(index, $event)">
              <v-icon name="trash" />
            </b-button>
          </b-button-group>
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
    <AlunoModal title="Entrada de Amostra - Selecione Aluno" @modal:select="setAluno" @modal:close="closeModal" v-if="openModal" />
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
import GenericObject from '@/types/GenericObject'

interface AvaliacaoEntry {
  aluno: number,
  nome: string,
  protocolo?: Maybe<number>
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
  private openModal: boolean = false
  private currentIndex: Maybe<number> = null

  private beforeMount () {
    this.add()
  }

  private add () {
    this.entries.push({
      aluno: 0,
      nome: '',
      protocolo: null
    })
  }

  private addEntry (e: Event) {
    this.add()
  }

  private save () {
    const entries = this.entries.map(entry => {
      const avaliacao = new AlunoAvaliacao()

      avaliacao.aluno = entry.aluno
      avaliacao.status = AvaliacaoStatus.STATUS_ENTRADA
      avaliacao.protocolo = entry.protocolo || 0

      return avaliacao
    })

    Repository.Avaliacoes.createEntries(entries)
  }

  private search (index: number, e: Event) {
    this.currentIndex = index
    this.openModal = true
  }

  private remove (index: number, e: Event) {
    if (this.entries.length === 1) {
      return this.updateEntry(index, { aluno: 0, nome: '', protocolo: null })
    }

    this.$delete(this.entries, index)
  }

  private updateEntry (index: number, data: AvaliacaoEntry) {
    const entry = this.entries[index] || null
    if (!entry) {
      return
    }

    Object.assign(entry, data)
  }

  @Emit('modal:select')
  private async setAluno ({ id, nome, cidade, UF }: GenericObject) {
    this.closeModal()

    this.updateEntry(this.currentIndex as number, { aluno: id, nome: `${nome} - ${cidade}/${UF}` })
    this.currentIndex = null
  }

  @Emit('modal:close')
  private closeModal () {
    this.openModal = false
  }


}
</script>

<style lang="scss" scoped>

.new-entry {
  form {
    .form-row {

    }
    .form-group {
      margin-bottom: 0;
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  input[type="number"] {
    appearance: textfield;
  }
}
</style>
