<template>
  <b-modal id="alunos-list-modal" ref="modal" size="lg" hide-footer @hidden="closeModal">
    <template v-slot:modal-title>
      {{ title }}
    </template>

    <b-table
      id="alunos-list-modal-table"
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
      tbody-tr-class="aluno"
      @filtered="onFiltered"
    >
      <template v-slot:head(id)="scope">Código</template>
      <template v-slot:cell(id)="data">{{ data.value }}</template>

      <template v-slot:head(tipoLabel)="scope">Tipo</template>

      <template v-slot:head(acoes)="scope"></template>
      <template v-slot:cell(acoes)="data">
        <b-button-group class="actions">
          <b-button class="action" variant="link" @click.prevent="select(data.value)">
            <v-icon name="check-square" />
          </b-button>
        </b-button-group>
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
      align="center"
      aria-controls="alunos-list"
      v-if="Math.ceil(list.length / perPage) > 1 && !isBusy"
    />
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

import Repository from '@/repository'
import Aluno from '@/models/Aluno'
import { TipoCadastro, TipoCadastroLabels } from '@/enums/Aluno'
import { UF } from '@/enums/Common'
import { TableListValues, TableListFields } from '@/types/TableList'
import { BModal } from 'bootstrap-vue'

interface List extends TableListValues {
  id: number,
  nome: string,
  CPF: string,
  email: string,
  UF: string,
  cidade: string,
  acoes: number
}

@Component
export default class ListAluno extends Vue {
  @Prop({ type: String, default: 'Alunos' })
  private title!: string

  private fields: TableListFields[] = [
    { key: 'id', thAttr: { width: '3%' }, sortable: true },
    { key: 'nome', sortable: true },
    { key: 'CPF', thAttr: { width: '10%' } },
    { key: 'cidade', thAttr: { width: '10%' }, sortable: true },
    { key: 'UF', thAttr: { width: '5%' }, sortable: true },
    { key: 'acoes', thAttr: { width: '1%' } }
  ]
  private list: List[] = []

  private currentPage: number = 1
  private perPage: number = 10
  private query: Maybe<string> = ''
  private filter: Maybe<string> = null
  private filterOn: string[] = []
  private listTotal: number = 0
  private isBusy: boolean = false

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

  mounted () {
    this.$nextTick(() => {
      const modal = this.$refs.modal as BModal
      modal && modal.show()
    })
  }

  private async getAlunos () {
    this.isBusy = true

    const result = await Repository.Alunos.getAll()

    this.list = result.map((row: Aluno) => {
      const item: List = {
        id: row.id,
        nome: row.nome,
        CPF: row.cpf !== '000.000.000-00' ? row.cpf : '',
        email: row.email,
        UF: row.uf,
        cidade: row.cidade,
        acoes: row.id
      }

      return item
    })

    this.listTotal = this.list.length
    this.isBusy = false
  }

  private onFiltered (filteredItems: List[]) {
    this.isBusy = false
    this.listTotal = filteredItems.length
    this.currentPage = 1
  }

  private search (event: Event) {
    const query = String(this.query)

    if (query === 'null' || query === this.filter) {
      return
    }

    this.isBusy = true
    setTimeout(() => {
      this.filter = query
    }, 1000)
  }

  private isTipoPreCadastro (aluno: List): boolean {
    return aluno.tipo === TipoCadastro.PRE_CADASTRO
  }

  private select (aluno: number) {
    this.$emit('modal:select', aluno)

    const modal = this.$refs.modal as BModal
    modal && modal.hide()
  }

  private closeModal () {
    this.$emit('modal:close')
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
      font-size: 12px;

      .aluno {
        .actions {
          visibility: hidden;

          .action {
            color: theme-color('info');

            &:hover {
              color: theme-color('primary');
            }
          }
        }

        &:hover {
          .actions {
            visibility: visible;
          }
        }
      }

    }
  }
</style>
