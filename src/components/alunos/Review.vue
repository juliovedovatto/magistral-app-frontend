<template>
  <b-container vif="aluno.id > 0">
    <b-row>
      <b-col>
        <b-button :to="{ name: 'alunos.avaliacao.add', params: { aluno: aluno.id } }">Adicionar Avaliação</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table-simple hover responsive>
          <b-thead>
            <b-tr>
              <b-th>Data</b-th>
              <b-th>Avaliado por</b-th>
              <b-th>Status</b-th>
              <b-th>Última atualização</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr :id="`avaliacao-${item.id}`" v-for="(item, index) in list" :key="`avaliacao-${index}`">
              <b-td>{{ $date(item.data_cadastro).format('DD/MM/YYYY HH:mm:ss') }}</b-td>
              <b-td>{{ item.usuario_cadastro }}</b-td>
              <b-td>{{ item.status }}</b-td>
              <b-td>{{ $date(item.data_alteracao).format('DD/MM/YYYY HH:mm:ss') }}</b-td>
              <b-td>
                <b-link @click.prevent="edit(item.id, $event)">Editar</b-link>
                <b-link @click.prevent="deleteReview(aluno.id, item.id, $event)">Apagar</b-link>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import Repository from '@/repository'
import AlunoAvaliacaoRepository from '@/repository/AlunoAvaliacao'

@Component
export default class Review extends Vue {
  @Prop() private aluno!: Aluno

  private repository!: AlunoAvaliacaoRepository
  private list: AlunoAvaliacao[] = []

  async beforeMount () {
    this.repository = new Repository.AlunoAvaliacao(this.aluno)

    await this.getHistorico()
  }

  private async getHistorico () {
    const result = await this.repository.getAll()

    this.list = result
  }

  private async edit (id: number, e: Event) {
    await this.$router.push({ name: 'alunos.avaliacao.edit', params: { aluno: String(this.aluno.id) , id: String(id) } })
  }

  private async deleteReview (aluno: number, item: number, event: Event) {
    const $avaliacao: HTMLElement = document.querySelector(`#avaliacao-${aluno}`) as HTMLElement

    const result = await this.repository.delete(item)
    if (result) {
      $avaliacao.remove()
    }
  }

  @Emit('form:avaliacao:save')
  private async save (aluno: Aluno, avaliacao: AlunoAvaliacao) {
    const result = await this.repository.update(avaliacao, avaliacao.id)

    console.log(result)
  }
}
</script>

<style lang="scss">

</style>