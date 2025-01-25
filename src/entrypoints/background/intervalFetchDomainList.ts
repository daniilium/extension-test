import { storage } from 'wxt/storage'

import { LOCAL_DOMAINS_LIST, ALARM_FETCH_DOMAINS } from './constants.ts'

const FETCH_DELAY_MS = 4 * 60 * 60 * 1000
const FETCH_DELAY_MINUTES = 240

export type Domain = {
  domain: string
  text: string
}

type DomainMeta = {
  lastUpdated: number
}

async function fetchDomainList() {
  try {
    const response = await fetch('https://config-tool.ru/ext.json')
    const sites = await response.json()
    if (!sites.ok) throw new Error('Failed to fetch sites')

    await storage.setItem<Domain[]>(LOCAL_DOMAINS_LIST, sites.data)
    await storage.setMeta<DomainMeta>(LOCAL_DOMAINS_LIST, {
      lastUpdated: Date.now(),
    })
  } catch (error) {
    console.error('Failed to fetch sites:', error)
  }
}

async function firstInitApp() {
  try {
    const meta = await storage.getMeta<DomainMeta>(LOCAL_DOMAINS_LIST)
    const lastUpdated = meta.lastUpdated
    const currentTime = Date.now()

    if (!lastUpdated || currentTime - lastUpdated > FETCH_DELAY_MS) {
      await fetchDomainList()
    }
  } catch (error) {
    console.error('Failed to initialize app:', error)
  }
}

export async function intervalFetchDomainList() {
  const alarm = await browser.alarms.get(ALARM_FETCH_DOMAINS)
  if (!alarm) {
    browser.alarms.create(ALARM_FETCH_DOMAINS, {
      periodInMinutes: FETCH_DELAY_MINUTES,
    })
  }

  browser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === ALARM_FETCH_DOMAINS) {
      await fetchDomainList()
    }
  })

  firstInitApp()
}
