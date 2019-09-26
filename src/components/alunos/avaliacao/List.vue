<template>
  <b-table id="avaliacao-list" sticky-header responsive hover show-empty :items="list" head-variant="light">
    <template v-slot:head(id)="scope"></template>
    <template v-slot:cell(id)="data">
      <b-button-group class="actions">
        <b-button class="action" variant="outline-secondary" size="sm" @click.prevent="edit(data.value, $event)">Editar</b-button>
        <b-button class="action" variant="outline-secondary" size="sm" @click.prevent="deleteReview(data.value, $event)">Apagar</b-button>
      </b-button-group>
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

interface List {
  id: number,
  data_cadastro: string,
  usuario_cadastro: number,
  status: string,
  data_alteracao: string
}

@Component
export default class ListAvaliacao extends Vue {
  @Prop() private aluno!: Aluno

  private repository!: AlunoAvaliacaoRepository
  private list: List[] = []

  async beforeMount () {
    this.repository = new Repository.AlunoAvaliacao(this.aluno)

    await this.getHistorico()
  }

  private async getHistorico () {
    const result = await this.repository.getAll()


    this.list = result.map(row => {
      const status = (AvaliacaoStatusLabels[Number(row.status)] || '') as string

      const item: List = {
        data_cadastro: row.data_cadastro,
        usuario_cadastro: Number(row.usuario_cadastro),
        status,
        data_alteracao: row.data_alteracao,
        id: Number(row.id)
      }

      return item
    })
  }

  private async edit (id: number, e: Event) {
    await this.$router.push({ name: 'alunos.avaliacao.edit', params: { aluno: String(this.aluno.id) , id: String(id) } })
  }

  private async deleteReview (id: number, event: Event) {
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