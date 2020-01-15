<template>
  <b-container>
    <h2>Importar Alunos</h2>

    <AlertMessage type="info" :close="false">
      <p><strong>Informações: </strong></p>
      <ul>
        <li>Importação funciona somente com arquivos de planilha excel (.xlsx).</li>
        <li>Você pode usar esta importação para adicionar novos alunos ou atualizar informações de diversos alunos.</li>
        <li>Para atualizar informação de alunos, é necessário que o aluno tenha CPF preenchido. Caso contrário irá criar um novo Aluno.</li>
        <li>Confira lista para evitar adicionar alunos duplicados.</li>
        <li>Planilha exemplo: <a href="/assets/import/exemplo_importacao.xlsx">exemplo_importacao.xlsx</a></li>
      </ul>
    </AlertMessage>

    <b-form v-if="!finished">
      <b-form-group description="Formato de importacão: arquivos Excel,.xls ou .xlsx" label="Arquivo de importação" :invalid-feedback="invalidUpload" :valid-feedback="validUpload" :state="state" v-if="!canProcessUpload">
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
        <AlertMessage type="info" message="Arquivo de importação é valido. Escolha ações a seguir" :close="false" v-if="!errorMessasge" />

        <template v-if="!errorMessasge">
          <div class="text-center mt-4">
            <b-button variant="primary" class="mr-2" size="lg" @click.prevent="process" :disabled="!canProcessUpload">
              <v-icon name="cogs" />
              Processar
            </b-button>
            <b-button variant="light" size="lg" @click.prevent="cancel">
              <v-icon name="times-circle" />
              Cancelar
            </b-button>
          </div>
        </template>
        <template v-else>
          <AlertMessage type="danger" :message="`Erro: ${errorMessasge}`" :close="false" />
          <b-button variant="primary" @click.prevent="cancel">
              <v-icon name="arrow-left" />
              Voltar
            </b-button>
        </template>
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
  private errorMessasge: Maybe<string> = null

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
    this.errorMessasge = null
    this.error = null

    if (!this.file) {
      return
    }

    try {
      this.$bus.$emit('loading:start')
      const { file, error } = await Repository.Alunos.importUpload(this.file)
      if (error) {
        throw new Error(error as string)
      }

      this.importFile = file as string
    } catch (err) {
      this.error = true
      this.errorMessasge = err.message
    } finally {
      this.$bus.$emit('loading:finish')
    }
  }

  async process () {
    this.errorMessasge = null
    this.error = null

    if (!this.canProcessUpload) {
      return
    }

    try {
      this.$bus.$emit('loading:start')
      const { error } = await Repository.Alunos.importProcess(this.importFile!)
      if (error) {
        throw new Error(error as string)
      }

      this.success = true
      this.finished = true
    } catch (err) {
      this.success = false
      this.errorMessasge = err.message
    } finally {
      this.$bus.$emit('loading:finish')
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
