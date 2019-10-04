<template>
  <b-table id="alunos-history" responsive hover show-empty :fields="fields" :items="list" head-variant="primary-light" tbody-tr-class="historico-entry">
    <template v-slot:head(id)="scope"></template>
    <template v-slot:cell(id)="data">
    </template>
    <template v-slot:head(dt_cadastro)="scope">Data</template>
    <template v-slot:cell(dt_cadastro)="data">
      {{ $date(data.value).format('DD/MM/YYYY HH:mm') }}
    </template>
    <template v-slot:cell(texto)="data">
      <nl2br tag="div" :text="data.value" class-name="historico" />
    </template>
    <template v-slot:head(usuario_cadastro)="scope">Usuário</template>
    <template v-slot:cell(id)="data" v-if="$me.isAdmin">
      <b-button variant="light" @click.prevent="remove(data.value, $event)">
        <v-icon name="trash" />
      </b-button>
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import AlunoHistoricoRepository from '@/repository/AlunoHistorico'
import AlunoHistorico from '@/models/AlunoHistorico'
import Aluno from '@/models/Aluno'
import User from '@/models/User'
import GenericObject from '@/types/GenericObject'
import { TableListFields, TableListValues } from '@/types/TableList'

interface List extends TableListValues {
  id: number,
  dt_cadastro: string,
  texto: string
  usuario_cadastro: number | string
}

@Component
export default class ListHistorico extends Vue {
  @Prop() private aluno!: Aluno

  private repository: Nullable<AlunoHistoricoRepository> = null
  private fields: TableListFields[] = [
    { key: 'dt_cadastro', thAttr: { width: '18%' }, sortable: true },
    { key: 'texto', thAttr: { width: '60%' } },
    { key: 'usuario_cadastro' },
    { key: 'id', thAttr: { width: '5%' } }
  ]
  private list: List[] = []

  async beforeMount () {
    this.repository = new Repository.AlunoHistorico(this.aluno)

    await this.getHistorico()

    this.$bus.$on('history:list:add', this.addList)
  }

  private async getHistorico () {
    const result = await this.repository!.getAll()

    this.list = (result || []).map((row: AlunoHistorico) => {
      const { usuario_cadastro } = row

      const item: List = {
        id: Number(row.id),
        dt_cadastro: row.dt_cadastro,
        texto: row.texto,
        usuario_cadastro: usuario_cadastro instanceof User ? usuario_cadastro.Nome : 'DESCONHECIDO'
      }

      return item
    })
  }

  private addList (item: AlunoHistorico) {
    this.list.unshift({
      id: Number(item.id),
      dt_cadastro: item.dt_cadastro,
      texto: item.texto,
      usuario_cadastro: Number(item.usuario_cadastro)
    })
  }

  private async remove (id: number, event: Event) {
    const result = await this.repository!.delete(id)
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
  .historico-entry {
    .historico {
      font-size: 11px;
    }
  }
</style>