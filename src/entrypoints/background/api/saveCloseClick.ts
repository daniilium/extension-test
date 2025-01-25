import {
  LOCAL_MESSAGE_CLOSED_KEY,
  SESSION_MESSAGE_CLICK_COUNT_KEY,
} from '@/entrypoints/background/constants'
import { getSiteKey } from '@/shared/lib'

export async function saveCloseClick(currentDomain: string) {
  const clickCount =
    (await storage.getItem<number>(
      getSiteKey(SESSION_MESSAGE_CLICK_COUNT_KEY, currentDomain)
    )) ?? 0

  const newClickCount = clickCount + 1
  await storage.setItem(
    getSiteKey(SESSION_MESSAGE_CLICK_COUNT_KEY, currentDomain),
    newClickCount
  )

  if (newClickCount >= 3)
    await storage.setItem(
      getSiteKey(LOCAL_MESSAGE_CLOSED_KEY, currentDomain),
      true
    )
}
