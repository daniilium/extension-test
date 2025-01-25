import { getDomainText } from '../api'
import AlertDialog from './AlertDialog'

export default function Content() {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    getDomainText().then((text) => text && setText(text))
  }, [])

  if (!text) return null

  return <AlertDialog text={text} />
}
