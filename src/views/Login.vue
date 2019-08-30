<template>
  <div class="home">
    <Login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Login from '@/components/auth/Login.vue'

@Component({
  components: {
    Login
  }
})
export default class extends Vue {
}
</script>
