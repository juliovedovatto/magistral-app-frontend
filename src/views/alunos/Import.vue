<template>
  <b-container>
    <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
    <b-button @click.prevent="upload">Upload</b-button>

    <b-button @click.prevent="process">Processar</b-button>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Repository from '@/repository'

@Component
export default class AlunosImport extends Vue {
  private file: Maybe<File> = null
  private importFile: Maybe<string> = null

  async upload () {
    if (!this.file) {
      return
    }

    const { file } = await Repository.Alunos.importUpload(this.file)

    this.importFile = file as string
  }

  async process () {

  }
}
</script>

<style lang="scss" scoped>

</style>
