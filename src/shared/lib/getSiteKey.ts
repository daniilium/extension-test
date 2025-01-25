import { StorageItemKey } from 'wxt/storage'

export function getSiteKey(
  key: StorageItemKey,
  domain: string
): StorageItemKey {
  return `${key}-${domain}`
}
