<template>
  <Form :usuario="usuario" v-on:form:save="save" />
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

  async beforeMount () {
    await this.getUsuario()
  }

  private async getUsuario () {
    this.$bus.$emit('loading:start')
    const result = await Repository.Usuarios.find(this.id)
    this.$bus.$emit('loading:finish')

    this.usuario = result
  }

  @Emit('form:save')
  async save () {
    this.$bus.$emit('loading:start')
    await Repository.Usuarios.update(this.usuario, this.id)
    this.$bus.$emit('loading:finish')

    await this.$router.push({ name: 'usuarios' })
  }
}
</script>
