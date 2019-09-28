<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button variant="primary" :to="{ name: 'alunos.add' }">Adicionar Novo Aluno</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Filter" label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
          <b-input-group size="sm">
            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          id="alunos-list"
          sticky-header
          responsive
          hover
          show-empty
          :items="list"
          :filter="filter"
          head-variant="light"
          @filtered="onFiltered"
        >
          <template v-slot:head(id)="scope"></template>
          <template v-slot:cell(id)="data">
            <b-button-group class="actions">
              <b-button class="action" variant="outline-secondary" size="sm" :to="{ name: 'alunos.edit', params: { id: data.value } }">Editar</b-button>
              <b-button class="action" variant="outline-secondary" size="sm" @click.prevent="deleteAluno(data.value, $event)">Apagar</b-button>
            </b-button-group>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage" :total-rows="listTotal" :per-page="perPage"
          :current-page="currentPage" size="sm" align="center" aria-controls="alunos-list"
          v-if="Math.ceil(list.length / perPage) > 1"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import { TipoCadastroLabels } from '@/enums/Aluno'

interface List {
  id: number,
  nome: string,
  CPF: string,
  email: string,
  UF: string,
  cidade: string,
  tipo: string | number
}

@Component
export default class ListAluno extends Vue {
  private fields: object[] = []
  private list: List[] = []

  private currentPage: number = 1
  private perPage: number = 30
  private filter = null
  private listTotal: number = 0

  async beforeMount () {
    await this.getAlunos()
  }

  private async getAlunos () {
    const result = await Repository.Alunos.getAll()

    this.list = result.map((row: Aluno) => {
      const item: List = {
        nome: row.nome,
        CPF: row.cpf,
        email: row.email,
        UF: row.uf,
        cidade: row.cidade,
        tipo: TipoCadastroLabels[row.tipo_cadastro],
        id: row.id
      }

      return item
    })
  }

  private async deleteAluno (id: number, e: Event) {
    const result = await Repository.Alunos.delete(id)
    if (result) {
      const index = this.list.findIndex(row => row.id === id)
      if (index >= 0) {
        this.$delete(this.list, index)
      }
    }
  }

  private onFiltered (filteredItems: List[]) {
    this.listTotal = filteredItems.length
    this.currentPage = 1
  }
}
</script>