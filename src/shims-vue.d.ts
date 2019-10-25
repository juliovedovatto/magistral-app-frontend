declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'v-mask'
declare module 'vue-fragment'
declare module 'vue-nl2br'
declare module 'tiptap-extensions' {
  import Vue from 'vue'

  export class Blockquote {}
  export class CodeBlock {}
  export class HardBreak {}
  export class Heading {}
  export class OrderedList {}
  export class BulletList {}
  export class ListItem {}
  export class TodoItem {}
  export class TodoList {}
  export class Bold {}
  export class Code {}
  export class Italic {}
  export class Link {}
  export class Strike {}
  export class Underline {}
  export class History {}
}
declare module 'tiptap' {
  import Vue from 'vue'
  import { EditorView } from 'prosemirror-view'
  import { EditorState, NodeSelection as PromseMirrorNodeSelection } from 'prosemirror-state'
  import { Schema } from 'prosemirror-model'
  export class Editor {
      public constructor({})

      public setOptions({}): void
      public setContent(content: string): void
      public destroy(): void

      public view: EditorView
      public state: EditorState
      public schema: Schema
  }

  export class EditorMenuBar extends Vue {}
  export class EditorMenuBubble extends Vue {}
  export class EditorContent extends Vue {}

  export class NodeSelection extends PromseMirrorNodeSelection {}
}

declare module 'tiptap-commands'

declare module "cuid" {
  function cuid(): string;
  export = cuid;
}


declare type Maybe<T> = T | null

declare interface FeedbackMessage {
  type: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark',
  message: string | string[] | object | object[]
}
