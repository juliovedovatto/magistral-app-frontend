<template>
  <div class="avaliacoes">
    <b-form-group label="Busca" label-cols-sm="6" label-align-sm="right" label-size="sm" label-for="filterInput">
      <b-input-group size="sm">
        <b-form-input v-model="query" type="search" id="filterInput" placeholder="Procurar por Aluno" />
        <b-input-group-append>
          <!-- <b-button :disabled="!filter" @click="filter = ''">limpar</b-button> -->
          <b-button variant="primary" @click.prevent="search">
            <v-icon name="search" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Status:" label-for="filterStatus" label-cols-sm="8" label-align-sm="right" label-size="sm">
      <b-input-group size="sm">
        <b-form-select id="filterStatus" v-model.number="status" :options="avaliacaoStatuses" />
      </b-input-group>
    </b-form-group>
    <b-form-group label="Avaliado por:" label-for="filterUsuario" label-cols-sm="8" label-align-sm="right" label-size="sm">
      <b-input-group size="sm">
        <b-form-select id="filterUsuario" v-model.number="usuario" :options="usuarios" :disabled="!this.usuarioList" />
      </b-input-group>
    </b-form-group>
    <b-table id="avaliacao-list"
      responsive hover
      show-empty
      :fields="fields"
      :items="filteredList"
      :current-page="currentPage"
      :busy="isBusy"
      :per-page="perPage"
      head-variant="primary-light"
    >
      <template v-slot:head(id)="scope"></template>
      <template v-slot:cell(id)="data">
        <b-button-group class="actions">
          <b-button class="action" variant="outline-secondary" @click.prevent="edit(data.value, data.item.aluno, $event)">
            <v-icon name="edit" />
          </b-button>
          <b-button class="action" variant="outline-secondary" @click.prevent="remove(data.value, data.item.aluno, $event)">
            <v-icon name="trash" />
          </b-button>
        </b-button-group>
      </template>
      <template v-slot:head(statusLabel)="scope">Status</template>
      <template v-slot:head(usuarioAvaliador)="scope">Avaliado por</template>
      <template v-slot:head(dataCadastro)="scope">Data</template>
      <template v-slot:cell(dataCadastro)="data">
        {{ $date(data.value).format('DD/MM/YYYY HH:mm') }}
      </template>
      <template v-slot:head(dataAlteracao)="scope">Última alteração</template>
      <template v-slot:cell(dataAlteracao)="data">
        {{ $date(data.value).format('DD/MM/YYYY HH:mm') }}
      </template>

      <template v-slot:empty="scope">
        <div role="alert" aria-live="polite">
          <div class="text-center my-2">Aluno sem avaliações disponíveis</div>
        </div>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="listTotal"
      :per-page="perPage"
      :current-page="currentPage"
      align="center"
      aria-controls="alunos-list"
      v-if="Math.ceil(list.length / perPage) > 1 && !isBusy"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TableListValues, TableListFields } from '@/types/TableList'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import Repository from '@/repository'
import { AvaliacaoStatusLabels } from '@/enums/Aluno'
import UsuarioInfo from '@/models/UsuarioInfo'
import unorm from 'unorm'
import { FormSelectOptions } from '@/types/Form'
import Usuario from '../../models/Usuario'

interface List extends TableListValues {
  id: number,
  nome: string,
  aluno: number,
  dataCadastro: string,
  usuarioCadastro: number,
  usuarioAvaliador: string,
  status: number,
  statusLabel: string,
  dataAlteracao: string
}

@Component
export default class ListAvaliacoes extends Vue {
  private list: List[] = []
  private isBusy: boolean = false
  private fields: TableListFields[] = [
    { key: 'nome', sortable: true },
    { key: 'dataCadastro', thAttr: { width: '15%' }, sortable: true },
    { key: 'statusLabel', thAttr: { width: '15%' } },
    { key: 'usuarioAvaliador', thAttr: { width: '15%' } },
    { key: 'dataAlteracao', thAttr: { width: '15%' }, sortable: true },
    { key: 'id', thAttr: { width: '7%' } }
  ]
  private usuarioList: Nullable<Usuario[]> = null


  private query: Nullable<string> = ''
  private status: Nullable<number> = null
  private usuario: number = 0

  private filter: Nullable<string> = null
  private filterStatus: Nullable<number> = null
  private filterUsuario: Nullable<number> = null

  private listTotal: number = 0
  private currentPage: number = 1
  private perPage: number = 30

  get avaliacaoStatuses (): FormSelectOptions[] {
    const options: FormSelectOptions[] = [ { value: null, text: '-- TODOS --' } ]
    const selectOptions = Object.entries(AvaliacaoStatusLabels)
        .map((status: any[]): FormSelectOptions => ({ value: status[0], text: status[1] }))

    return options.concat(selectOptions)
  }

  get usuarios (): FormSelectOptions[] {
    const options: FormSelectOptions[] = [ { value: 0, text: '-- TODOS --' } ]
    const selectOptions = (this.usuarioList || [])
      .map((usuario): FormSelectOptions => ({ value: usuario.id, text: usuario.nome }))

    return options.concat(selectOptions)
  }

  get filteredList (): List[] {
    if (!this.filter && !this.filterStatus && !this.filterUsuario) {
      return this.list
    }

    return this.list.filter(this.filterList)
  }

  async beforeMount () {
    this.isBusy = true

    await this.fetchUsuarios()
    await this.getAvaliacoes()

    this.isBusy = false
  }

  private async fetchUsuarios () {
    this.usuarioList = await Repository.Usuarios.getAll()
  }

  private async getAvaliacoes () {
    const result = await Repository.Avaliacoes.getAll()

    this.list = result.map(row => {
      const statusLabel = (AvaliacaoStatusLabels[Number(row.status)] || 'DESCONHECIDO') as string

      const item: List = {
        id: Number(row.id),
        nome: row.aluno instanceof Aluno ? row.aluno.nome : '',
        aluno: row.aluno instanceof Aluno ? row.aluno.id : row.aluno || 0,
        dataCadastro: row.data_cadastro,
        usuarioCadastro: row.usuario_cadastro instanceof UsuarioInfo ? row.usuario_cadastro.id : 0,
        usuarioAvaliador: row.usuario_cadastro instanceof UsuarioInfo ? row.usuario_cadastro.nome : 'DESCONHECIDO',
        status: row.status as number,
        statusLabel,
        dataAlteracao: row.data_alteracao
      }

      return item
    })

    this.listTotal = this.list.length
  }

  private async edit (id: number, aluno: number, event: Event) {
    await this.$router.push({ name: 'alunos.avaliacao.edit', params: { id: String(id), aluno: String(aluno) } })
  }

  private async remove (id: number, aluno: number, event: Event) {
    const result = await Repository.Avaliacoes.delete(id, aluno)
    if (result) {
      const index = this.list.findIndex(row => row.id === id)
      if (index >= 0) {
        this.$delete(this.list, index)
      }
    }
  }

  private search (event: Event) {
    this.isBusy = true

    setTimeout(() => {
      this.filter = this.query
      this.filterStatus = this.status
      this.filterUsuario = this.usuario
    }, 1000)
  }

  private filterList (row: List): boolean {
    const nomralizedFilter = this.filter && this.filter.normalize('NFKD') || ''
    const status = this.filterStatus
    const usuario = this.filterUsuario

    return (!nomralizedFilter || row.nome.normalize('NFKD').indexOf(nomralizedFilter) >= 0) &&
      (!status || row.status === status) &&
      (!usuario || row.usuarioCadastro === usuario)
  }

  @Watch('currentPage')
  private async onCurrentPage (value: number) {
    const page = value !== 1 ? value : ''

    await this.$router.push({ query: { page: page ? String(page) : undefined } })
  }

  @Watch('filteredList')
  private onFilteredList (value: List[]) {
    this.isBusy = false
    this.listTotal = value.length
    this.currentPage = 1
  }

}
</script>

<style lang="scss" scoped>

</style>
