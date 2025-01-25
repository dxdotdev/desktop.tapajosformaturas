import { getCurrentWindow } from '@tauri-apps/api/window'
import { Minus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Header() {
  const window = getCurrentWindow()

  function handleMinimize() {
    window.minimize()
  }

  function handleClose() {
    window.close()
  }

  return (
    <header className="absolute flex w-full justify-end" data-tauri-drag-region>
      <Button variant="ghost" size="icon" className="w-12 rounded-none" onClick={handleMinimize}>
        <Minus />
      </Button>
      <Button variant="ghost" size="icon" className="w-12 rounded-none hover:bg-destructive" onClick={handleClose}>
        <X />
      </Button>
    </header>
  )
}
