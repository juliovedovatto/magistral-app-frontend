<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {

  async created () {
    await this.$store.dispatch('logout')
    await this.$router.push('/login')
  }
}
</script>
