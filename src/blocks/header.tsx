import { getCurrentWindow } from '@tauri-apps/api/window'
import { Minus, Square, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Header() {
  const window = getCurrentWindow()

  return (
    <header className="flex justify-end" data-tauri-drag-region>
      <Button variant="ghost" size="icon" className="w-12 rounded-none" onClick={() => window.minimize()}>
        <Minus />
      </Button>

      <Button variant="ghost" size="icon" className="w-12 rounded-none" onClick={() => window.toggleMaximize()}>
        <Square className="scale-75" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="w-12 rounded-none hover:bg-destructive"
        onClick={() => window.close()}
      >
        <X />
      </Button>
    </header>
  )
}
