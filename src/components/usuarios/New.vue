<template>
  <b-container>
    <b-row no-gutters>
      <b-col>
        <b-button variant="primary" :to="{ name: 'usuarios' }">
          <v-icon name="arrow-left" />
          Voltar para Listagem
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters class="mt-3">
      <b-col>
        <Form :usuario="usuario" newRecord="true" v-on:form:save="save" />
      </b-col>
    </b-row>
  </b-container>
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
    await this.$router.push({ name: 'usuarios' })
  }
}
</script>