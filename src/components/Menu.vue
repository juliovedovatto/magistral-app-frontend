<template functional>
  <b-navbar type="default" toggleable="sm">
    <b-navbar-brand :to="{ name: 'home' }">Cia. Magistral</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'alunos' }">Alunos</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
         <b-nav-item :to="{ name: 'usuarios' }">Usuários</b-nav-item>

        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item :to="{ name: 'profile' }">Meus Dados</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'logout' }">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Menu extends Vue {

}
</script>

<style lang="scss" scoped>

</style>