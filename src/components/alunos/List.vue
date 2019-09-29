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
          responsive
          hover
          show-empty
          :items="list"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :current-page="currentPage"
          :per-page="perPage"
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
          v-model="currentPage"
          :total-rows="listTotal"
          :per-page="perPage"
          :current-page="currentPage"
          size="sm"
          align="center"
          aria-controls="alunos-list"
          v-if="Math.ceil(list.length / perPage) > 1"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import { TipoCadastroLabels } from '@/enums/Aluno'
import { UF } from '@/enums/Common'
import { Dictionary } from 'vue-router/types/router'

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
  private filter: Nullable<string> = null
  private filterOn: string[] = []
  private listTotal: number = 0

  async beforeMount () {
    const { page } = this.$route.query
    if (page && !Number.isNaN(page as any)) {
      if (page === '1') {
        this.$router.push({ query: { page: undefined } })
      } else {
        this.currentPage = Number(page as any)
      }
    }

    await this.getAlunos()
  }

  private async getAlunos () {
    const result = await Repository.Alunos.getAll()

    this.list = result.map((row: Aluno) => {
      const item: List = {
        nome: row.nome,
        CPF: row.cpf !== '000.000.000-00' ? row.cpf : '',
        email: row.email,
        UF: row.uf,
        cidade: row.cidade,
        tipo: TipoCadastroLabels[row.tipo_cadastro],
        id: row.id
      }

      return item
    })

    this.listTotal = this.list.length
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

  @Watch('currentPage')
  private async onCurrentPage(value: number) {
    const page = value !== 1 ? value : ''

    await this.$router.push({ query: { page: page ? String(page) : undefined } })
  }

  @Watch('filter')
  private onFilter(value: string) {

  }
}
</script>