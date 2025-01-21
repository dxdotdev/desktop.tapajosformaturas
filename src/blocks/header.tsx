import { getCurrentWindow } from '@tauri-apps/api/window'
import { Minus, Square, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Header() {
  const window = getCurrentWindow()

  return (
    <header className="flex justify-end">
      <Button variant="ghost" size="icon" className="rounded-none" onClick={() => window.minimize()}>
        <Minus />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-none" onClick={() => window.toggleMaximize()}>
        <Square className="scale-90" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-none" onClick={() => window.close()}>
        <X />
      </Button>
    </header>
  )
}
