import { LOCAL_DOMAINS_LIST } from '@/entrypoints/background/constants'
import { Domain } from '@/entrypoints/background/intervalFetchDomainList'
import { getCurrentDomain } from '@/shared/lib/getCurrentDomain'

export async function isDomainInList(): Promise<boolean> {
  const sites = await storage.getItem<Domain[]>(LOCAL_DOMAINS_LIST)

  if (!sites) return false
  const currentDomain = getCurrentDomain()

  return sites?.some((site) => site.domain === currentDomain)
}
