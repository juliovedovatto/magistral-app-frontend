
<template>
  <b-form @submit.prevent="onSubmit" class="mb-5">
    <b-row>
      <b-col>
        <b-form-group label="Histórico:" label-for="input-entry" class="mb-0">
          <b-form-textarea id="input-entry" v-model="entry" type="text" rows="8" />
        </b-form-group>
      </b-col>
      <b-col cols="2" align-self="end">
        <b-button type="submit" variant="success">Salvar</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FormHistory extends Vue {
  private entry: String = ''

  onSubmit () {
    this.$emit('form:hisotry:save', this.entry)
  }
}
</script>

<style lang="scss" scoped>
  form {
    textarea {
      resize: none;
    }
  }
</style>