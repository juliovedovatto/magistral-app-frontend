<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <List />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import List from '@/components/avaliacoes/List.vue'

@Component({
  components: {
    List
  }
})
export default class AvaliacoesList extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
