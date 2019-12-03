<template>
  <b-container>
    <h2>Importar Alunos</h2>

    <AlertMessage type="warning" message="Atenção: registros sem CPF preenchido serão considerados novos alunos. Confira lista para não inserir Aluno duplicados" :close="false" />

    <b-form v-if="!finished">
      <b-form-group description="Formato de importacão: arquivos Excel,.xls ou .xlsx" label="Arquivo de importação" :invalid-feedback="invalidUpload" :valid-feedback="validUpload" :state="state">
        <b-form-file
          v-model="file" placeholder="Escolher arquivo" drop-placeholder="Solte arquivo aqui..."
          browse-text="Selecionar arquivo"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </b-form-group>

      <template v-if="!canProcessUpload">
        <b-button variant="primary" class="mr-2" @click.prevent="upload" :disabled="!file">
          <v-icon name="file-upload" />
          Upload
        </b-button>
        <b-button variant="light" @click.prevent="reset" :disabled="!file">
          <v-icon name="times-circle" />
          Cancelar
        </b-button>
      </template>
      <template v-else>
        <AlertMessage type="info" message="Arquivo de importação é valido. Escolha ações a seguir" :close="false" />

        <b-button variant="primary" class="mr-2" @click.prevent="process" :disabled="!canProcessUpload">
          <v-icon name="cogs" />
          Processar
        </b-button>
        <b-button variant="light" @click.prevent="cancel">
          <v-icon name="times-circle" />
          Cancelar
        </b-button>
      </template>
    </b-form>
    <template v-else>
      <AlertMessage type="success" message="Importação realizada com sucesso" :close="false" />
      <div class="text-center">
        <b-button variant="light" @click.prevent="newImport">
          <v-icon name="file" />
          Nova Importação
        </b-button>
      </div>
    </template>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Repository from '@/repository'

import AlertMessage from '@/components/common/AlertMessage.vue'

@Component({
  components: {
    AlertMessage
  }
})
export default class AlunosImport extends Vue {
  private file: Maybe<File> = null
  private importFile: Maybe<string> = null
  private success: Maybe<boolean> = null
  private error: Maybe<boolean> = null
  private finished: boolean = false

  get state (): boolean {
    return false
  }

  get canProcessUpload (): boolean {
    return this.importFile && this.importFile.length > 0 || false
  }

  get invalidUpload (): string {
    if (!this.importFile && !this.error) {
      return ''
    }

    return this.error && 'Ocorreu um erro ao pré-processar importação.' || ''
  }

  get validUpload (): string {
    return this.canProcessUpload && 'Arquovo de importação é valido' || ''
  }

  async upload () {
    this.error = null

    if (!this.file) {
      return
    }

    try {
      this.$bus.$emit('loading:start')
      const { file } = await Repository.Alunos.importUpload(this.file)
      this.importFile = file as string
    } catch (err) {
      this.error = true
      console.error(err)
    } finally {
      this.$bus.$emit('loading:finish')
    }
  }

  async process () {
    if (!this.canProcessUpload) {
      return
    }

    try {
      await Repository.Alunos.importProcess(this.importFile!)
      this.success = true
      this.finished = true
    } catch (err) {
      this.success = false
    }
  }

  cancel () {
    this.file = null
    this.importFile = null
  }

  reset () {
    this.cancel()
    this.error = null
  }

  newImport () {
    this.reset()

    this.$nextTick(() => {
      this.success = null
      this.finished = false
    })
  }
}
</script>

<style lang="scss" scoped>
  form {
    ::v-deep {
      .custom-file {
        .custom-file-input {
          cursor: pointer;
        }
      }
    }
  }
</style>
