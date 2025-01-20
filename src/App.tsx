import '@/index.css'
import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/600.css'
import '@fontsource/geist-sans/700.css'

import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings } from '@/blocks/settings'
import { Actions } from '@/blocks/actions'
import { TooltipProvider } from './components/ui/tooltip'

function App() {
  return (
    <TooltipProvider>
      <div className="cursor-default select-none p-8 font-['Geist_Sans']">
        <header className="flex items-center">
          <h1 className="mb-4 flex-1 font-semibold text-3xl">Utilidades</h1>
        </header>

        <Tabs defaultValue="actions">
          <TabsList className="grid w-64 grid-cols-2">
            <TabsTrigger value="actions">Ações</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="actions">
            <Actions />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>

        <Toaster />
      </div>
    </TooltipProvider>
  )
}

export default App
