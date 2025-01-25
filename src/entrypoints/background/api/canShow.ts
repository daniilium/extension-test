import {
  LOCAL_MESSAGE_CLOSED_KEY,
  SESSION_MESSAGE_CLICK_COUNT_KEY,
} from '@/entrypoints/background/constants'

import { getSiteKey } from '@/shared/lib'

export async function canShow(currentDomain: string): Promise<boolean> {
  const isClosed = await storage.getItem<boolean>(
    getSiteKey(LOCAL_MESSAGE_CLOSED_KEY, currentDomain)
  )

  if (isClosed) return false

  const clickCount = await storage.getItem<number>(
    getSiteKey(SESSION_MESSAGE_CLICK_COUNT_KEY, currentDomain)
  )

  return (clickCount ?? 0) < 3
}
