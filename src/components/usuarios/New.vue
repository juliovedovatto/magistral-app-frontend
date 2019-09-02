<template>
  <Form :usuario="usuario" newRecord="true" v-on:form:save="save" />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Repository from '@/repository'
import Usuario from '@/models/Usuario'
import Form from './Form.vue'

@Component({
  components: {
    Form
  }
})
export default class extends Vue {
  @Prop() private id!: number

  private usuario: Usuario = new Usuario()

  @Emit('form:save')
  async save () {
    await Repository.Usuarios.create(this.usuario)

    this.$router.push({ name: 'usuarios' })
  }
}
</script>