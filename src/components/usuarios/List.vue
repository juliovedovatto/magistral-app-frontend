<template>
<b-container>
    <b-row>
      <b-col class="text-right mb-3">
        <b-button variant="primary" :to="{ name: 'usuarios.add' }">Adicionar Novo Usuario</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          id="usuarios-list"
          responsive
          hover
          show-empty
          :items="list"
          :busy="isBusy"
          head-variant="primary-light"
          tbody-tr-class="usuario-entry"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
          <template v-slot:head(id)="scope"></template>
          <template v-slot:cell(id)="data">
            <b-button-group class="actions">
              <b-button :to="{ name: 'usuarios.edit', params: { id: data.value } }" class="action" variant="outline-secondary" size="sm">Editar</b-button>
              <b-button class="action" variant="outline-secondary" size="sm" @click.prevent="remove(data.value, $event)" v-if="isAdmin && !myself(data.value)">
                <v-icon name="trash" />
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-col>
    </b-row>
</b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Store from '@/store'
import Repository from '@/repository'
import Usuario from '@/models/Usuario'
import UserModel from '@/models/User'

import { StatusLabels, NivelLabels, Nivel } from '@/enums/Usuario'

interface List {
  id: number,
  nome: string,
  email: string
  login: string
  nivel: string | number
  status: string | number
}

@Component
export default class extends Vue {
  private list: List[] = []
  private isBusy: boolean = false

  get isAdmin (): boolean {
    return Boolean(this.$me && this.$me.isAdmin)
  }

  async beforeMount () {
    this.isBusy = true
    await this.getUsuarios()
  }

  private async getUsuarios () {
    const result = await Repository.Usuarios.getAll()

    this.list = (result || []).map((row: Usuario) => {
      const item: List = {
        nome: row.nome,
        email: row.email,
        login: row.login,
        nivel: NivelLabels[row.nivel],
        status: StatusLabels[row.status],
        id: row.id
      }
      return item
    })

    this.isBusy = false
  }

  private async remove (id: number, e: Event) {
    const result = await Repository.Usuarios.delete(id)
    if (result) {
      const index = this.list.findIndex(row => row.id === id)
      if (index >= 0) {
        this.$delete(this.list, index)
      }
    }
  }

  private myself (id: number): boolean {
    return Boolean(this.$me && id === this.$me.Id)
  }
}
</script>