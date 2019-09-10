<template>
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
          <b-link @click.prevent="edit(aluno.id, item.id, $event)">Editar</b-link>
          <b-link @click.prevent="deleteReview(aluno.id, item.id, $event)">Apagar</b-link>
        </b-td>
      </b-tr>
      <b-tr :id="`avaliacao-form-${item.id}`" v-for="(item, index) in list" :key="`avaliacao-form-${index}`">
        <b-td colspan="5">
          <Form :aluno="aluno" :avaliacao="item" v-on:form:avaliacao:save="save" />
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>

</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import Repository from '@/repository'
import Form from './FormReview.vue'

@Component({
  components: {
    Form
  }
})
export default class Review extends Vue {
  @Prop() private aluno!: Aluno

  private list: AlunoAvaliacao[] = []

  async beforeMount () {
    await this.getHistorico()
  }

  private async getHistorico () {
    const repository = new Repository.AlunoAvaliacao(this.aluno)
    const result = await repository.getAll()

    this.list = result
  }

  private edit () {

  }

  private async deleteReview (aluno: number, review: number, event: Event) {
    const $avaliacao: HTMLElement = document.querySelector(`#avaliacao-${aluno}`) as HTMLElement

    // const result = await Repository.Alunos.delete(id)
    // if (result) {
      $avaliacao.remove()
    // }
  }

  @Emit('form:avaliacao:save')
  private async save(aluno: Aluno, avaliacao: AlunoAvaliacao) {
    const repository = new Repository.AlunoAvaliacao(this.aluno)

    const result = await repository.update(avaliacao, avaliacao.id)

    console.log(result)
  }
}
</script>

<style lang="scss">

</style>