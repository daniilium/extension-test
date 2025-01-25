import {
  LOCAL_COUNT_VISIT_DOMAIN,
  LOCAL_DOMAINS_LIST,
} from '@/entrypoints/background/constants'
import { Domain } from '@/entrypoints/background/intervalFetchDomainList'
import { getSiteKey } from '@/shared/lib'

export async function fetchDomains() {
  const domains = await storage.getItem<Domain[]>(LOCAL_DOMAINS_LIST)
  if (!domains) return []

  const fetchVisitCount = async (d: Domain) => {
    return {
      domain: d.domain,
      visitCount:
        (await storage.getItem<number>(
          getSiteKey(LOCAL_COUNT_VISIT_DOMAIN, d.domain)
        )) ?? 0,
    }
  }

  const visited = domains.map(fetchVisitCount)

  return await Promise.all(visited)
}
