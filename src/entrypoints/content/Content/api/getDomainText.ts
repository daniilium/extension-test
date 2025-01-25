import { LOCAL_DOMAINS_LIST } from '@/entrypoints/background/constants'
import { Domain } from '@/entrypoints/background/intervalFetchDomainList'
import { getRootDomain } from '@/shared/lib'

export async function getDomainText() {
  const sites = await storage.getItem<Domain[]>(LOCAL_DOMAINS_LIST)
  if (!sites) return false
  const currentDomain = getRootDomain(window.location.href)
  return sites.find((site) => site.domain === currentDomain)?.text ?? false
}
