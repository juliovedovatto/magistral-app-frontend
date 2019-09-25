<template>
  <div>
    <b-row>
      <b-col>Data</b-col>
      <b-col>Texto</b-col>
      <b-col>Enviado por:</b-col>
    </b-row>
    <b-row v-for="(item, index) in list" :key="`historico-${index}`" class="historico-entry">
      <b-col>{{ $date(item.dt_cadastro).format('DD/MM/YYYY HH:mm:ss') }}</b-col>
      <b-col>
        <nl2br tag="p" :text="item.texto" class-name="historico" />
      </b-col>
      <b-col>{{ item.usuario_cadastro }}</b-col>
    </b-row>
  </div>
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