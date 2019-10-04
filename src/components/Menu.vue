<template>
  <b-navbar type="default" toggleable="sm">
    <b-navbar-brand :to="{ name: 'home' }">Cia. Magistral</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" v-if="user"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav v-if="user">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'alunos' }">Alunos</b-nav-item>
        <b-nav-item :to="{ name: 'avaliacoes' }">Avaliações</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
         <b-nav-item :to="{ name: 'usuarios' }">Usuários</b-nav-item>

        <b-nav-item-dropdown right class="user-menu">
          <template v-slot:button-content>
            <v-icon name="user" :label="user.Nome" /> {{ user.Nome }}
          </template>
          <b-dropdown-item :to="{ name: 'usuarios.edit', params: { id: user.Id } }">Meus Dados</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'logout' }">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import User from '@/models/User'

@Component
export default class Menu extends Vue {

  get user (): Nullable<User> {
    return this.$me
  }

}
</script>

<style lang="scss" scoped>

</style>