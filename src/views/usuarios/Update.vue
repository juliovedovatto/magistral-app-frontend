<template>
  <Edit :id="this.id" v-if="this.id > 0" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Edit from '@/components/usuarios/Edit.vue'

@Component({
  components: {
    Edit
  }
})
export default class extends Vue {
  private id: number = 0

  beforeMount () {
    this.id = Number(this.$route.params.id) || 0
  }
}
</script>