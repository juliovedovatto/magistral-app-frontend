<template>
  <b-container class="home">
    <b-row>
      <b-col>
        <h2>Dashboard</h2>
        <h6>Selecione ações no menu para utilizar o sistema.</h6>
      </b-col>
    </b-row>
  </b-container>
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
