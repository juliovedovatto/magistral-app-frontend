<template>
  <b-container>
    <b-row class="mb-3">
      <b-col class="text-right">
        <b-button variant="primary" :to="{ name: 'alunos.add' }">
          <v-icon name="plus" />
          Adicionar Novo Aluno
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group label="Busca" label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-2">
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
      </b-col>
    </b-row>
    <div class="mass-actions d-flex justify-content-end mt-2 mb-2" v-if="alunosChecked.length > 1">
      <div class="align-self-center mr-4">
        Ações em massa:
      </div>
      <div>
        <div class="d-flex justify-content-end w-100">
          <b-dropdown text="Mudar Tipo para..." variant="light">
            <b-dropdown-item v-for="(label, tipo) in tipoOptions" :key="`${tipo}-${label}`" @click.prevent="updateTipoChecked(tipo)">{{ label }}</b-dropdown-item>
          </b-dropdown>
          <b-button variant="light" class="ml-2" @click.prevent="removeChecked">
            <v-icon name="trash" />
            Apagar
          </b-button>
        </div>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-table
          id="alunos-list"
          responsive
          hover
          show-empty
          :fields="fields"
          :items="list"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :current-page="currentPage"
          :busy="isBusy"
          :per-page="perPage"
          head-variant="primary-light"
          @filtered="onFiltered"
        >
          <template v-slot:head(id)="scope">Código</template>
          <template v-slot:cell(id)="data">{{ data.value }}</template>

          <template v-slot:head(tipoLabel)="scope">Tipo</template>
          <template v-slot:cell(tipoLabel)="data">
            <b-badge :variant="data.item.tipo ? 'primary' : 'light'">{{ data.item.tipoLabel }}</b-badge>
          </template>

          <template v-slot:head(acoes)="scope"></template>
          <template v-slot:cell(acoes)="data">
            <div class="d-flex align-align-items-center">
              <b-button-group class="actions">
                <b-button class="action" variant="outline-secondary" :to="{ name: 'alunos.edit', params: { id: data.value } }">
                  <v-icon name="edit" />
                </b-button>
                <b-button class="action" variant="outline-secondary" @click.prevent="remove(data.value, $event)" v-if="canRemove(data.item)">
                  <v-icon name="trash" />
                </b-button>
              </b-button-group>
              <div class="pl-2">
                <b-checkbox :class="{ checkbox: true, checked: alunosChecked.includes(data.value) }" v-model="alunosChecked" :value="data.value" />
              </div>
            </div>
          </template>

          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
          <template v-slot:empty="scope">
            <h4>Sem Alunos cadastrados</h4>
          </template>
          <template v-slot:emptyfiltered="scope">
            <h4>(0) resultados encontrados</h4>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="listTotal"
          :per-page="perPage"
          :current-page="currentPage"
          limit="10"
          align="center"
          aria-controls="alunos-list"
          v-if="hasPages"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import { TipoCadastro, TipoCadastroLabels } from '@/enums/Aluno'
import { UF } from '@/enums/Common'
import { TableListValues, TableListFields } from '@/types/TableList'
import isUserAdmin from '@/utils/is-user-admin'

interface List extends TableListValues {
  id: number,
  nome: string,
  CPF: string,
  dtNasc: string,
  UF: string,
  cidade: string,
  tipo: number,
  tipoLabel: string | number,
  acoes: number
}

@Component
export default class ListAluno extends Vue {
  private fields: TableListFields[] = [
    { key: 'id', thAttr: { width: '5%' }, sortable: true },
    { key: 'nome', sortable: true },
    { key: 'CPF', thAttr: { width: '15%' } },
    { key: 'cidade', thAttr: { width: '10%' }, sortable: true },
    { key: 'UF', thAttr: { width: '5%' }, sortable: true },
    { key: 'tipoLabel', thAttr: { width: '10%' }, tdClass: 'text-center', sortable: true },
    { key: 'acoes', thAttr: { width: '15%' } }
  ]
  private list: List[] = []

  private currentPage: number = 1
  private perPage: number = 30
  private query: Maybe<string> = ''
  private filter: Maybe<string> = null
  private filterOn: string[] = [
    'id', 'nome', 'CPF', 'cidade', 'UF', 'tipoLabel'
  ]
  private listTotal: number = 0
  private isBusy: boolean = false
  private alunosChecked: number[] = []

  get hasPages () {
    return Math.ceil(this.listTotal / this.perPage) > 1 && !this.isBusy
  }

  get tipoOptions (): EnumObject {
    return TipoCadastroLabels
  }

  get checkedInList (): List[] {
    return this.alunosChecked.length && this.list.filter(aluno => this.alunosChecked.includes(aluno.id)) || []
  }

  async beforeMount () {
    const { page } = this.$route.query
    if (page && !Number.isNaN(page as any)) {
      if (page === '1') {
        await this.$router.push({ query: { page: undefined } })
      } else {
        this.currentPage = Number(page as any)
      }
    }

    await this.getAlunos()
  }

  private async getAlunos () {
    this.isBusy = true

    const result = await Repository.Alunos.getAll()

    this.list = result.map((row: Aluno) => {
      const item: List = {
        id: row.id,
        nome: row.nome,
        CPF: row.cpf !== '000.000.000-00' ? row.cpf : '',
        dtNasc: row.dt_nascimento,
        UF: row.uf,
        cidade: row.cidade,
        tipo: row.tipo_cadastro,
        tipoLabel: TipoCadastroLabels[row.tipo_cadastro],
        acoes: row.id
      }

      return item
    })

    this.listTotal = this.list.length
    this.isBusy = false
  }

  private async remove (id: number, e: Event) {
    this.$bus.$emit('loading:start')
    const result = await Repository.Alunos.delete(id)
    this.$bus.$emit('loading:finish')

    if (result) {
      const index = this.list.findIndex(row => row.id === id)
      if (index >= 0) {
        this.$delete(this.list, index)
      }
    }
  }

  private async updateTipoChecked (tipo: TipoCadastro) {
    this.$bus.$emit('loading:start')

    await Repository.Alunos.batchUpdate('tipo', tipo, this.alunosChecked)

    this.checkedInList.forEach(aluno => {
      aluno.tipoLabel = TipoCadastroLabels[tipo]
    })

    this.$bus.$emit('loading:finish')
  }

  private async removeChecked () {
    const indexes = this.checkedInList.map<number>(checked => {
      return this.list.findIndex(aluno => aluno.id === checked.id)
    })

    await Repository.Alunos.batchDelete(this.alunosChecked)

    indexes.forEach(index => this.$delete(this.list, index))
    this.alunosChecked = []
  }

  private onFiltered (filteredItems: List[]) {
    this.isBusy = false
    this.listTotal = filteredItems.length
    this.currentPage = 1
  }

  private search (event: Event) {
    const query = String(this.query)

    this.alunosChecked = []

    if (query === 'null' || query === (this.filter || '')) {
      return
    }

    this.isBusy = true
    setTimeout(() => {
      this.filter = query
    }, 1000)
  }

  private canRemove (item: List): boolean {
    return isUserAdmin(this.$me) || this.isTipoPreCadastro(item)
  }

  private isTipoPreCadastro (aluno: List): boolean {
    return aluno.tipo === TipoCadastro.PRE_CADASTRO
  }

  @Watch('currentPage')
  private async onCurrentPage (value: number) {
    const page = value !== 1 ? value : ''

    await this.$router.push({ query: { page: page ? String(page) : undefined } })
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .table {
      .actions {
        .btn {
          flex-grow: 0;
        }
      }
      .checkbox {
        opacity: 0;

        &.checked {
          opacity: 1;
        }
      }
      tbody {
        tr {
          td:last-child {
            padding-right: 0;
          }

          &:hover {
            .checkbox {
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>
