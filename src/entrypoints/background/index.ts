import { intervalFetchDomainList } from './intervalFetchDomainList'

export default defineBackground(() => {
  intervalFetchDomainList()
})
