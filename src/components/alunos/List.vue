<template>
  <b-table-simple hover small responsive>
    <b-thead>
      <b-tr>
        <b-th>Nome</b-th>
        <b-th>CPF</b-th>
        <b-th>Email</b-th>
        <b-th>UF</b-th>
        <b-th>Cidade</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr :id="`aluno-${aluno.id}`" v-for="aluno in list" :key="aluno.id">
          <b-td>{{ aluno.nome }}</b-td>
          <b-td>{{ aluno.cpf }}</b-td>
          <b-td>{{ aluno.email }}</b-td>
          <b-td>{{ aluno.uf }}</b-td>
          <b-td>{{ aluno.cidade }}</b-td>
          <b-td>
             <!-- <router-link :to="{ name: 'alunos.view', params: { id: aluno.id } }">Detalhes</router-link> -->
             <router-link :to="{ name: 'alunos.edit', params: { id: aluno.id } }">Editar</router-link>
             <b-link @click.prevent="deleteAluno(aluno.id, $event)">Apagar</b-link>
          </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Repository from '@/repository'
import Aluno from '@/models/Aluno'

@Component
export default class extends Vue {
  private list: Aluno[] = []

  async beforeMount () {
    await this.getAlunos()
  }

  private async getAlunos () {
    const result = await Repository.Alunos.getAll()

    this.list = result
  }

  private async deleteAluno (id: number, e: Event) {
    const $aluno: HTMLElement = document.querySelector(`#aluno-${id}`) as HTMLElement

    const result = await Repository.Alunos.delete(id)
    if (result) {
      $aluno.remove()
    }
  }
}
</script>