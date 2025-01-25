import { getRootDomain } from '@/shared/lib'
import { ContentScriptContext } from 'wxt/client'
import { Domain } from '../background/intervalFetchDomainList'
import { LOCAL_DOMAINS_LIST } from '../background/constants'

function doesUrlSearch() {
  const allowedUrls = [
    'https://ya.ru/search/?text=',
    'https://www.google.com/search?q=',
    'https://www.google.ru/search?q=',
  ]

  const currentUrl = window.location.href // Получаем текущий полный URL

  return allowedUrls.some((url) => currentUrl.startsWith(url)) // Проверяем, начинается ли текущий URL с одного из разрешённых
}

export function siteBadgesInSearchResults(ctx: ContentScriptContext) {
  const ui = createIntegratedUi(ctx, {
    position: 'inline',
    anchor: 'body',
    onMount: () => {
      if (doesUrlSearch()) {
        const currentDomain = getRootDomain(window.location.href)
        if (currentDomain === 'ya.ru') handleYandexSearch()
        else handleGoogleSearch()
      }
    },
  })

  ui.mount()
}

async function handleYandexSearch() {
  function observeDOMChanges(callback: () => void) {
    const observer = new MutationObserver(() => {
      callback()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return observer
  }

  async function handleDynamicChanges() {
    const callback = async () => {
      const elements = document.querySelectorAll<HTMLAnchorElement>(
        '.Link.Link_theme_outer.Path-Item.link.path__item.path__item.organic__greenurl'
      )

      elements.forEach(async (element) => {
        const href = element?.href
        if (!href) return

        const domains = await storage.getItem<Domain[]>(LOCAL_DOMAINS_LIST)
        const isHrefInDomainList = domains?.some((domain) => {
          return getRootDomain(href) === domain.domain
        })

        if (isHrefInDomainList && !element.querySelector('svg')) {
          element.insertAdjacentHTML(
            'afterbegin',
            '<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="blue" /></svg>'
          )
        }
      })
    }

    observeDOMChanges(callback)
    await callback()
  }

  handleDynamicChanges()
}

async function handleGoogleSearch() {
  const citeElements = document.querySelectorAll('cite[role="text"]')

  citeElements.forEach(async (element) => {
    let text = element.textContent
    if (!text) return
    if (text) text = text?.split('›')[0].trim()

    const domains = await storage.getItem<Domain[]>(LOCAL_DOMAINS_LIST)
    const isTextInDomainList = domains?.some((domain) => {
      return getRootDomain(text) === domain.domain
    })

    if (isTextInDomainList) {
      element.insertAdjacentHTML(
        'afterbegin',
        '<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="blue" /></svg>'
      )
    }
  })
}
