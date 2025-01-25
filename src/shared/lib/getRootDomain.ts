export function getRootDomain(url: string) {
  try {
    const hostname = new URL(url).hostname
    const match = hostname.match(/(?:[^.]+\.)?([^.]+\.[^.]+)$/)
    return match ? match[1] : null
  } catch (e) {
    console.error('Invalid URL:', url)
    return null
  }
}
