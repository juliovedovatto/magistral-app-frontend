<template>
  <b-table id="alunos-history" responsive hover show-empty :items="list" head-variant="light">
    <template v-slot:head(id)="scope"></template>
    <template v-slot:cell(id)="data">
    </template>
    <template v-slot:cell(texto)="data">
      <nl2br tag="div" :text="data.value" class-name="historico" />
    </template>
  </b-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import AlunoHistorico from '@/models/AlunoHistorico'
import Aluno from '@/models/Aluno'

interface List {
  id: number,
  dt_cadastro: string,
  texto: string
  usuario_cadastro: number
}

@Component
export default class ListHistory extends Vue {
  @Prop() private aluno!: Aluno

  private list: List[] = []

  async beforeMount () {
    await this.getHistorico()

    this.$bus.$on('history:list:add', this.addList)
  }

  private async getHistorico () {
    const repository = new Repository.AlunoHistorico(this.aluno)
    const result = await repository.getAll()

    this.list = (result || []).map((row: AlunoHistorico) => {
      const item: List = {
        id: Number(row.id),
        dt_cadastro: row.dt_cadastro,
        texto: row.texto,
        usuario_cadastro: Number(row.usuario_cadastro)
      }

      return item
    })
  }

  private addList (item: AlunoHistorico) {
    console.log('history:list:add')

    this.list.unshift({
      id: Number(item.id),
      dt_cadastro: item.dt_cadastro,
      texto: item.texto,
      usuario_cadastro: Number(item.usuario_cadastro)
    })
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