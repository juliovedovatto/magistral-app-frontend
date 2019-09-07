<template>
  <List />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Repository from '@/repository'

import List from '@/components/alunos/List.vue'

@Component({
  components: {
    List
  }
})
export default class extends Vue {}
</script>>