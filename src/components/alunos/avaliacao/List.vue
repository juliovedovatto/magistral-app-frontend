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
        <b-button class="action" variant="outline-secondary" size="sm" @click.prevent="edit(data.value, $event)">
          <v-icon name="edit" />
        </b-button>
        <b-button class="action" variant="outline-secondary" size="sm" @click.prevent="remove(data.value, $event)">
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
    <template v-slot:cell(video)="data">
      <b-link class="video-link" target="_blank" :href="data.value" v-if="data.value">
        <v-icon name="video" />
      </b-link>
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
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import Repository from '@/repository'
import AlunoAvaliacaoRepository from '@/repository/AlunoAvaliacao'
import { AvaliacaoStatusLabels } from '@/enums/Aluno'
import UsuarioInfo from '@/models/UsuarioInfo'
import { TableListFields, TableListValues } from '@/types/TableList'

interface List extends TableListValues {
  id: number,
  data_cadastro: string,
  usuario_cadastro: string,
  status: string,
  data_alteracao: string,
  video: string
}

@Component
export default class ListAvaliacao extends Vue {
  @Prop() private aluno!: Aluno

  private repository!: AlunoAvaliacaoRepository
  private fields: TableListFields[] = [
    { key: 'data_cadastro', thAttr: { width: '20%' }, sortable: true },
    { key: 'status', thAttr: { width: '15%' } },
    { key: 'video', thAttr: { width: '5%' }, tdClass: 'text-center' },
    { key: 'usuario_cadastro' },
    { key: 'data_alteracao', thAttr: { width: '20%' }, sortable: true },
    { key: 'id', thAttr: { width: '7%' } }
  ]
  private list: List[] = []
  private isBusy: boolean = false

  async beforeMount () {
    this.repository = new Repository.AlunoAvaliacao(this.aluno)

    await this.getAvaliacoes()
  }

  private async getAvaliacoes () {
    this.isBusy = true

    const result = await this.repository.getAll()

    this.list = result.map(row => {
      const status = (AvaliacaoStatusLabels[Number(row.status)] || '') as string

      const item: List = {
        id: Number(row.id),
        data_cadastro: row.data_cadastro,
        usuario_cadastro: row.usuario_cadastro instanceof UsuarioInfo ? row.usuario_cadastro.nome : 'DESCONHECIDO',
        status,
        data_alteracao: row.data_alteracao,
        video: row.video
      }

      return item
    })

    this.isBusy = false
  }

  private async edit (id: number, e: Event) {
    await this.$router.push({ name: 'avaliacoes.edit', params: { id: String(id) }, query: { from: 'alunos.edit' } })
  }

  private async remove (id: number, event: Event) {
    const result = await this.repository.delete(id)
    if (result) {
      const index = this.list.findIndex(row => row.id === id)
      if (index >= 0) {
        this.$delete(this.list, index)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
