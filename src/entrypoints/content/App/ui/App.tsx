import { getDomainText } from '../api'
import { canShow } from '../api/canShow'
import AlertDialogDemo from './AlertDialogDemo'

export default function App() {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    canShow().then((canShow) => console.log('canShow', canShow))

    getDomainText().then((text) => text && setText(text))
  }, [])

  if (!text) return null

  return <AlertDialogDemo text={text} />
}
