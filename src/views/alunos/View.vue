<template>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  private id: number = 0

  beforeMount () {
    this.id = Number(this.$route.params.id) || 0
  }
}
</script>