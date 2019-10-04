<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {

  async beforeMount () {
    await this.$store.dispatch('logout')
    await this.$router.push({ name: 'login' })
  }
}
</script>
