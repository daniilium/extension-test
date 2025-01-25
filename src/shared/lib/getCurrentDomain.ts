export function getCurrentDomain() {
  let hostname = new URL(window.location.href).hostname

  if (hostname.startsWith('www.')) {
    hostname = hostname.replace('www.', '')
  }

  return hostname
}
