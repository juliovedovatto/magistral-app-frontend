<template>
  <b-table id="avaliacao-list"
    sticky-header
    responsive hover
    show-empty
    :fields="fields"
    :items="list"
    :busy="isBusy"
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
    <template v-slot:head(usuario_cadastro)="scope">Avaliado por</template>
    <template v-slot:head(data_cadastro)="scope">Data</template>
    <template v-slot:cell(data_cadastro)="data">
      {{ $date(data.value).format('DD/MM/YYYY HH:mm') }}
    </template>
    <template v-slot:head(data_alteracao)="scope">Última alteração</template>
    <template v-slot:cell(data_alteracao)="data">
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TableListValues, TableListFields } from '@/types/TableList'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import Repository from '@/repository'
import AvaliacoesRepository from '@/repository/Avaliacoes'
import { AvaliacaoStatusLabels } from '@/enums/Aluno'
import UsuarioInfo from '@/models/UsuarioInfo'

interface List extends TableListValues {
  id: number,
  nome: string,
  aluno: number,
  data_cadastro: string,
  usuario_cadastro: string,
  status: string,
  data_alteracao: string
}

@Component
export default class ListAvaliacoes extends Vue {
  private list: List[] = []
  private isBusy: boolean = false
  private repository!: AvaliacoesRepository
  private fields: TableListFields[] = [
    { key: 'nome', sortable: true },
    { key: 'data_cadastro', thAttr: { width: '15%' }, sortable: true },
    { key: 'status', thAttr: { width: '15%' } },
    { key: 'usuario_cadastro', thAttr: { width: '15%' } },
    { key: 'data_alteracao', thAttr: { width: '15%' }, sortable: true },
    { key: 'id', thAttr: { width: '7%' } }
  ]

  async beforeMount () {
    this.repository = new Repository.Avaliacoes()

    await this.getAvaliacoes()
  }

  private async getAvaliacoes () {
    this.isBusy = true

    const result = await this.repository.getAll()

    this.list = result.map(row => {
      const status = (AvaliacaoStatusLabels[Number(row.status)] || '') as string

      const item: List = {
        id: Number(row.id),
        nome: row.aluno instanceof Aluno ? row.aluno.nome : '',
        aluno: row.aluno instanceof Aluno ? row.aluno.id : row.aluno || 0,
        data_cadastro: row.data_cadastro,
        usuario_cadastro: row.usuario_cadastro instanceof UsuarioInfo ? row.usuario_cadastro.nome : 'DESCONHECIDO',
        status,
        data_alteracao: row.data_alteracao
      }

      return item
    })

    this.isBusy = false
  }

  private async edit (id: number, aluno: number, event: Event) {
    await this.$router.push({ name: 'alunos.avaliacao.edit', params: { id: String(id), aluno: String(aluno) } })
  }

  private async remove(id: number, aluno: number, event: Event) {
    const result = await this.repository.delete(id, aluno)
    if (result) {
      const index = this.list.findIndex(row => row.id === id)
      if (index >= 0) {
        this.$delete(this.list, index)
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
