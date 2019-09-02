<template>
  <b-table-simple hover small responsive>
    <b-thead>
      <b-tr>
        <b-th>Nome</b-th>
        <b-th>Email</b-th>
        <b-th>Login</b-th>
        <b-th>Nivel</b-th>
        <b-th>Status</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr :id="`usuario-${usuario.id}`" v-for="usuario in list" :key="usuario.id">
          <b-td>{{ usuario.nome }}</b-td>
          <b-td>{{ usuario.email }}</b-td>
          <b-td>{{ usuario.login }}</b-td>
          <b-td>{{ usuario.nivel }}</b-td>
          <b-td>{{ usuario.status }}</b-td>
          <b-td>
             <router-link :to="{ name: 'usuarios.edit', params: { id: usuario.id } }">Editar</router-link>
             <b-link @click.prevent="deleteUsuario(usuario.id, $event)">Apagar</b-link>
          </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Repository from '@/repository'
import Usuario from '@/models/Usuario'

@Component
export default class extends Vue {
  private list: Usuario[] = []

  async beforeMount () {
    await this.getUsuarios()
  }

  private async getUsuarios () {
    const result = await Repository.Usuarios.getAll()

    this.list = result
  }

  private async deleteUsuario (id: number, e: Event) {
    const $usuario: HTMLElement = document.querySelector(`#usuario-${id}`) as HTMLElement

    const result = await Repository.Usuarios.delete(id)
    if (result) {
      $usuario.remove()
    }
  }
}
</script>