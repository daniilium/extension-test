import { canShow, saveCloseClick, trackVisit } from './api'
import { intervalFetchDomainList } from './intervalFetchDomainList'

export default defineBackground(() => {
  browser.runtime.onStartup.addListener(() => {
    intervalFetchDomainList()
  })

  browser.runtime.onInstalled.addListener(() => {
    intervalFetchDomainList()
  })

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    ;(async () => {
      try {
        if (message.type === 'canShow') {
          const response = await canShow(message.currentDomain)
          sendResponse(response)
        }

        if (message.type === 'saveCloseClick') {
          await saveCloseClick(message.currentDomain)
          sendResponse({ status: 'success' })
        }

        if (message.type === 'trackVisit') {
          await trackVisit(message.domain)
          sendResponse({ status: 'success' })
        }
      } catch {
        throw new Error(`Failed to handle message type: ${message.type}`)
      }
    })()

    return true
  })
})
