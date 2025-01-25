import { Suspense } from 'react'
import { Table } from './Table'
import { fetchDomains } from '../api'

export default function Popup() {
  const dataPromise = useMemo(() => fetchDomains(), [])

  return (
    <Suspense fallback={<p>Загрузка доменов...</p>}>
      <div className="p-4">
        <Table dataPromise={dataPromise} />
      </div>
    </Suspense>
  )
}
