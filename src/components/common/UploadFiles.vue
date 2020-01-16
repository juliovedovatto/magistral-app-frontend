<template>
  <div class="upload-files">
    <vue-dropzone ref="upload" :id="id" :options="options" useCustomSlot>
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">...or click to select a file from your computer</div>
      </div>
    </vue-dropzone>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import vueDropzone from 'vue2-dropzone'
import { DropzoneOptions } from 'dropzone'

import randomId from '@/utils/random-id'
import Store from '@/store'
import { UPLOAD_ALLOWED_MIME_TYPES } from '@/config'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'

@Component({
  components: {
    vueDropzone
  }
})
export default class UploadFiles extends Vue {
  @Prop({ type: String, default: `upload-files-${randomId()}` })
  private id!: string

  @Prop({ required: true, type: String })
  private url!: string

  @Prop({ type: Number, default: 0.5 }) // filesize in MB
  private maxFilesize!: number

  @Prop({ default: UPLOAD_ALLOWED_MIME_TYPES })
  private acceptedMimeTypes!: string

  private options: DropzoneOptions = {
    headers: {
      'Authorization': `Bearer ${Store.getters.token}`,
    },
    addRemoveLinks: true,
    createImageThumbnails: false
  }

  created () {
    const options: DropzoneOptions = {
      url: this.url,
      maxFilesize: this.maxFilesize,
      acceptedFiles: this.acceptedMimeTypes
    }

    this.options = Object.assign(this.options, options)
  }
}
</script>

<style lang="scss" scoped></style>
