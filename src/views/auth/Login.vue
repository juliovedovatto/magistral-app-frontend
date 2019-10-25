<template>
  <div class="login w-50 ml-auto mr-auto mt-5">
    <h2>CIa. Magistral - Acesso</h2>
    <h5>Entre com suas credenciais para ter acesso ao sistema</h5>
    <Login class="mt-5" />
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
export default class AuthLogin extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
