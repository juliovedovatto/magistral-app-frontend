<template>
  <b-container>
    <b-row class="mb-3" no-gutters>
      <b-col class="text-right">
        <b-button variant="primary" :to="{ name: 'alunos.add' }">
          <v-icon name="plus" />
          Adicionar Novo Aluno
        </b-button>
        <b-button variant="light" class="ml-2" :to="{ name: 'alunos.import' }">
          <v-icon name="file-upload" />
          Importar Alunos
        </b-button>
      </b-col>
    </b-row>
    <List />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import List from '@/components/alunos/List.vue'

@Component({
  components: {
    List
  }
})
export default class extends Vue {}
</script>>
