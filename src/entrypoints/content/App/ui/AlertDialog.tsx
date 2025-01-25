import { useState } from 'react'
import {
  AlertDialog as AlertDialogShadcn,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { getCurrentDomain } from '@/shared/lib'

type Props = {
  text: string
}

export default function AlertDialog({ text }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  const handleSaveCloseClick = async () => {
    await browser.runtime.sendMessage({
      type: 'saveCloseClick',
      currentDomain: getCurrentDomain(),
    })
  }

  return (
    <AlertDialogShadcn open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{text}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleSaveCloseClick()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogShadcn>
  )
}
