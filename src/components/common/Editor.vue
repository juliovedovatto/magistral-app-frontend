<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, focused }">
      <div class="menubar is-hidden" :class="{ 'is-focused': focused }">
        <b-button variant="light" class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click.prevent="commands.bold">
          N
        </b-button>
        <b-button variant="light" class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click.prevent="commands.italic">
          I
        </b-button>
        <b-button variant="light" class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click.prevent="commands.underline">
          S
        </b-button>
        <b-button variant="light" class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click.prevent="commands.strike">
          T
        </b-button>
        <b-button variant="light" class="menubar__button" :class="{ 'is-active': isActive.link() }" @click.prevent="commands.link">
          URL
        </b-button>
        <b-button variant="light" class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click.prevent="commands.bullet_list">
          UL
        </b-button>
        <b-button variant="light" class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click.prevent="commands.ordered_list">
          OL
        </b-button>
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
      }
    }
  }
</style>