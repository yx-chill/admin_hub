import Link from '@tiptap/extension-link'
import { getAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export default function createLinkExtension(callback) {
  return Link.configure({
    openOnClick: false,
  }).extend({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('handleSelectLinkEvent'),
          props: {
            handleClick: (view, pos, event) => {
              const attrs = getAttributes(view.state, 'link')
              const link = event.target.closest('a')

              if (link) {
                callback(attrs)
                return true
              }

              return false
            },
          },
        })
      ]
    }
  })
}