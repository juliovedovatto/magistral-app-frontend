<template>
  <div v-if="aluno">
    <h2>{{ aluno.nome }}</h2>
    <p>
      {{ aluno.cidade }} / {{ aluno.uf }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Aluno from '@/models/Aluno'

@Component
export default class CommonEditor extends Vue {
  @Prop({ required: true })
  private aluno!: Aluno
}
</script>

<style lang="scss" scoped>
</style>
