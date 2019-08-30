<template>
  <div class="home">
    <button type="button" @click="login">Click</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})

export default class extends Vue {


  private login () {
    const login = 'admin'
    const senha = '123456'

    this.$store.dispatch('login', { login, senha }).then(response => {
      console.log(response)
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>
