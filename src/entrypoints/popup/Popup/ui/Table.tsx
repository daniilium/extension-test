import {
  Table as TableShadcn,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { use } from 'react'

type Props = {
  dataPromise: Promise<{ domain: string; visitCount: number }[]>
}

export function Table(props: Props) {
  const data = use(props.dataPromise)

  return (
    <TableShadcn>
      <TableCaption>Количество посещений сайтов из списка</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Domain</TableHead>
          <TableHead className="text-right">Visits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d) => (
          <TableRow key={d.domain}>
            <TableCell className="font-medium">{d.domain}</TableCell>
            <TableCell className="text-right">{d.visitCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1}>Total</TableCell>
          <TableCell className="text-right">
            {data.reduce((a, b) => a + b.visitCount, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </TableShadcn>
  )
}
