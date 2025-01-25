import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContentScriptContext } from 'wxt/client'
import '~/assets/tailwind.css'

import { Content, isDomainInList } from './Content'
import { getCurrentDomain } from '@/shared/lib'

async function mountApp(ctx: ContentScriptContext) {
  const ui = await createShadowRootUi(ctx, {
    name: 'content-script',
    position: 'inline',
    onMount: (container) => {
      // Don't mount react app directly on <body>
      const wrapper = document.createElement('div')
      wrapper.id = 'app-wrapper'
      container.append(wrapper)

      const root = ReactDOM.createRoot(wrapper)
      root.render(
        <React.StrictMode>
          <Content />
        </React.StrictMode>
      )
      return { root, wrapper }
    },
    onRemove: (elements) => {
      elements?.root.unmount()
      elements?.wrapper.remove()
    },
  })

  ui.mount()
}

// eslint-disable-next-line react-refresh/only-export-components
export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const inList = await isDomainInList()

    if (inList) {
      browser.runtime.sendMessage({
        type: 'trackVisit',
        domain: getCurrentDomain(),
      })
    }

    const canShow = await browser.runtime.sendMessage({
      type: 'canShow',
      currentDomain: getCurrentDomain(),
    })

    if (inList && canShow) mountApp(ctx)
  },
})
