<template>
  <b-container fluid id="app">
    <b-row tag="header" no-gutters>
      <b-col >
        <Menu />
      </b-col>
    </b-row>
    <b-row tag="main" no-gutters>
      <b-container>
        <router-view/>
      </b-container>
    </b-row>
    <b-row tag="footer" no-gutters>
      <b-col class="text-right">
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Menu from '@/components/Menu.vue'

@Component({
  components: {
    Menu
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">
#app {
  &.container-fluid {
    padding: 0;
  }

  > header {

  }
  > main {
    padding: 20px 0;
  }
  > footer {

  }
}
</style>
