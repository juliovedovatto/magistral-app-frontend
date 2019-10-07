<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
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
          <b-button class="menubar__button" :class="{ 'is-active': isActive.link() }" v-b-tooltip.hover title="Inserir link" variant="light" @click.prevent="commands.link">
            <v-icon name="link" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" v-b-tooltip.hover title="Lista com marcadores" variant="light" @click.prevent="commands.bullet_list">
            <v-icon name="list-ul" />
          </b-button>
          <b-button class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" v-b-tooltip.hover title="Lista numerada" variant="light" @click.prevent="commands.ordered_list">
            <v-icon name="list-ol" />
          </b-button>
        </b-button-group>
      </div>
    </editor-menu-bar>
    <!-- <editor-menu-bubble class="menububble" :editor="editor" @hide="hideLinkMenu" v-slot="{ commands, isActive, getMarkAttrs, menu }">
      <div class="menububble" :class="{ 'is-active': menu.isActive }" :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
        <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
            x
          </button>
        </form>
        <template v-else>
          <button class="menububble__button" @click="showLinkMenu(getMarkAttrs('link'))" :class="{ 'is-active': isActive.link() }">
            <span>{{ isActive.link() ? 'Update Link' : 'Add Link'}}</span>
            link
          </button>
        </template>
      </div>
    </editor-menu-bubble> -->
    <div @click.prevent="focus">
      <editor-content class="editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import {
  Bold, Italic, Strike, Underline, BulletList,
  ListItem, OrderedList, Link
} from 'tiptap-extensions'

@Component({
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  }
})
export default class CommonEditor extends Vue {
  @Prop({ default: '' }) private content!: string

  private editor: Nullable<Editor> = null

  private linkUrl: Nullable<string> = ''
  private linkMenuIsActive: boolean = false

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

  // showLinkMenu(attrs) {
  //   this.linkUrl = attrs.href
  //   this.linkMenuIsActive = true
  //   this.$nextTick(() => {
  //     this.$refs.linkInput.focus()
  //   })
  // }
  // hideLinkMenu() {
  //   this.linkUrl = null
  //   this.linkMenuIsActive = false
  // }

  // setLinkUrl(command, url) {
  //   command({ href: url })
  //   this.hideLinkMenu()
  // }

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
      }
    }
  }
</style>