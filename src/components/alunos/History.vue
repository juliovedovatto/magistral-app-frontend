<template>
  <b-container>
    <b-row>
      <b-col>
        <Form :aluno="aluno" v-on:form:hisotry:save="save" />
      </b-col>
    </b-row>
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
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import AlunoRepository from '@/repository/AlunoHistorico'
import AlunoHistorico from '@/models/AlunoHistorico'
import Aluno from '@/models/Aluno'
import Form from './FormHistory.vue'

@Component({
  components: {
    Form
  }
})
export default class extends Vue {
  @Prop() private aluno!: Aluno

  private list: AlunoHistorico[] = []

  async beforeMount () {
    await this.getHistorico()
  }

  private async getHistorico () {
    const repository = new Repository.AlunoHistorico(this.aluno)
    const result = await repository.getAll()

    this.list = result
  }

  @Emit('form:hisotry:save')
  private async save (entry: String) {
    const repository = new Repository.AlunoHistorico(this.aluno)
    const model = new AlunoHistorico()

    model.texto = entry

    const item = await repository.create(model)

    this.list.unshift(item)
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