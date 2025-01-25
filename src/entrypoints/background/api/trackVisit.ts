import { getSiteKey } from '@/shared/lib'
import { LOCAL_COUNT_VISIT_DOMAIN } from '../constants'

export async function trackVisit(domain: string) {
  const visitCount =
    (await storage.getItem<number>(
      getSiteKey(LOCAL_COUNT_VISIT_DOMAIN, domain)
    )) ?? 0

  const newVisitCount = visitCount + 1
  storage.setItem(getSiteKey(LOCAL_COUNT_VISIT_DOMAIN, domain), newVisitCount)
}
