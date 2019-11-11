<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, focused }">
      <div class="menubar is-hidden" :class="{ 'is-focused': focused }">
        <b-button-group>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.bold() }" v-b-tooltip.hover title="Negrito" variant="light" @click.prevent="commands.bold">
            <b-img src="@/assets/images/editor/negrito.svg" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.italic() }" v-b-tooltip.hover title="Itálico" variant="light" @click.prevent="commands.italic">
            <b-img src="@/assets/images/editor/italico.svg" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.underline() }" v-b-tooltip.hover title="Sublinhar" variant="light" @click.prevent="commands.underline">
            <b-img src="@/assets/images/editor/sublinhado.svg" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.strike() }" v-b-tooltip.hover title="Tachado" variant="light" @click.prevent="commands.strike">
            <b-img src="@/assets/images/editor/tachado.svg" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.link() }" v-b-tooltip.hover v-b-modal.editor-modal-link title="Inserir link" variant="light">
            <v-icon name="link" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" v-b-tooltip.hover title="Lista com marcadores" variant="light" @click.prevent="commands.bullet_list">
            <v-icon name="list-ul" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" v-b-tooltip.hover title="Lista numerada" variant="light" @click.prevent="commands.ordered_list">
            <v-icon name="list-ol" />
          </b-button>
        </b-button-group>
        <b-modal id="editor-modal-link" ref="modal" title="Inserir Link" @show="showLinkMenu(getMarkAttrs('link'))" @hidden="resetModal" @ok="saveLink($event, commands.link)">
          <b-form @submit.prevent="saveLink($event, commands.link)">
            <b-input-group>
              <template v-slot:prepend>
                <b-input-group-text>
                  <v-icon name="link" />
                </b-input-group-text>
              </template>
              <b-input type="url" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu" />
            </b-input-group>
          </b-form>
        </b-modal>
      </div>
    </editor-menu-bar>
    <div @click.prevent="focus">
      <editor-content class="editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { BvModalEvent, BModal } from 'bootstrap-vue'
import { Editor, EditorContent, EditorMenuBar, NodeSelection } from 'tiptap'
import {
  Bold, Italic, Strike, Underline, BulletList,
  ListItem, OrderedList, Link
} from 'tiptap-extensions'

@Component({
  components: {
    EditorContent,
    EditorMenuBar
  }
})
export default class CommonEditor extends Vue {
  @Prop({ default: '' }) private content!: string

  private editor: Maybe<Editor> = null

  private linkUrl: Maybe<string> = ''
  private linkMenuIsActive: boolean = false

  get isSelectioEmpty (): boolean {
    const { view: { state: { tr: { selection } } } } = this.getEditor()

    return selection.empty
  }

  beforeMount () {
    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Link()
      ],
      content: this.content,
      onUpdate: (event: any) => {
        this.$emit('update:editor', event.getHTML())
      }
    })
  }

  beforeDestroy () {
    this.editor && this.editor.destroy()
  }

  private focus () {
    this.editor && this.editor.view.focus()
  }

  saveLink (event: BvModalEvent, command: CallableFunction) {
    this.setLinkUrl(command, this.linkUrl || '')
    this.hideLinkMenu()
  }

  showLinkMenu (attrs: GenericObject) {
    this.linkUrl = attrs.href
    this.linkMenuIsActive = true

    this.$nextTick(() => {
      const input = this.$refs.linkInput as HTMLInputElement
      input && input.focus()
    })
  }

  resetModal () {
    this.linkUrl = null
    this.linkMenuIsActive = false
  }

  hideLinkMenu () {
    this.resetModal()

    this.$nextTick(() => {
      const modal = this.$refs.modal as BModal
      modal && modal.hide()
    })
  }

  setLinkUrl (command: CallableFunction, url: string) {
    const { schema, state: { tr }, view } = this.getEditor()

    if (this.isSelectioEmpty) {
      const [ link ] = tr.selection.$anchor.marks()
      const isLink = link && link.type.name === 'link'

      if (url) {
        let text = url

        if (url) {
          if (isLink) {
            if (url !== link.attrs.href) {
              const linkNode = tr.selection.$anchor.node(tr.selection.$anchor.depth)
              const resolvedPos = tr.doc.resolve(
                tr.selection.anchor - (tr.selection.$anchor.nodeBefore && tr.selection.$anchor.nodeBefore.nodeSize || 0)
              )
              tr.setSelection(new NodeSelection(resolvedPos))

              text = (tr.selection as NodeSelection).node.textContent
            }
          }

          const node = schema.text(text, [ schema.marks.link.create({ href: url }) ])
          view.dispatch(tr.replaceSelectionWith(node, false))
        }
      } else {
        if (isLink) {
          const node = tr.selection.$anchor.node(0)
          const resolvedPos = tr.doc.resolve(
            tr.selection.anchor - (tr.selection.$anchor.nodeBefore && tr.selection.$anchor.nodeBefore.nodeSize || 0)
          )

          tr.setSelection(new NodeSelection(resolvedPos))

          const { from, to } = tr.selection
          view.dispatch(tr.removeMark(from, to, link))
        }
      }
    } else {
      command({ href: url })
    }
  }

  getEditor (): Editor {
    return this.editor as Editor
  }

}
</script>

<style lang="scss" scoped>
  .editor {
    .menubar {
      transition: opacity 0.2s ease-in-out;
      will-change: opacity;

      &.is-hidden {
        opacity: 0;
      }
      &.is-focused {
        opacity: 1;
      }

      .menubar__button {
        height: 32px;

        &.is-active {
          color: #212529;
          background-color: #d5e1e5;
          border-color: #cddbe1;
        }

        img {
          height: 80%;
        }
      }
    }

    .editor__content {
      border: 1px solid #ced4da;
      border-radius: 0.25rem;

      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
      min-height: 300px;

      ::v-deep .ProseMirror {
        outline: none;
        padding: 10px;

        ul, ol {
          li {
            > p {
              margin: 0;
            }
          }
        }
        a {
          pointer-events: none;
        }
      }
    }
  }
</style>
