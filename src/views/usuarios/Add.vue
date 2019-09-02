<template>
  <New />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import New from '@/components/usuarios/New.vue'

@Component({
  components: {
    New
  }
})
export default class extends Vue {}
</script>