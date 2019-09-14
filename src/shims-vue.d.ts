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
  import * as ProseView from 'prosemirror-view'
  export class Editor {
      public constructor({})

      public setOptions({}): void
      public setContent(content: string): void
      public destroy(): void

      public view: ProseView.EditorView
  }

  export class EditorMenuBar extends Vue {}

  export class EditorContent extends Vue {}
}


declare type Nullable<T> = T | null