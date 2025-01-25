import {
  LOCAL_MESSAGE_CLOSED_KEY,
  SESSION_MESSAGE_CLICK_COUNT_KEY,
} from '@/entrypoints/background/constants'

import { getCurrentDomain, getSiteKey } from '@/shared/lib'

export async function canShow(): Promise<boolean> {
  const currentDomain = getCurrentDomain()

  const isClosed = await storage.getItem<boolean>(
    getSiteKey(LOCAL_MESSAGE_CLOSED_KEY, currentDomain)
  )
  if (isClosed) return false

  const clickCount =
    (await storage.getItem<number>(SESSION_MESSAGE_CLICK_COUNT_KEY)) ?? 0
  return clickCount < 3
}
