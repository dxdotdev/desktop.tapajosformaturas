import '@/index.css'
import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/700.css'

import { Header } from '@/components/blocks/header'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LinksPage } from '@/pages/links'
import { SettingsPage } from '@/pages/settings'
import { TooltipProvider } from './components/ui/tooltip'

function App() {
  return (
    <>
      <Header />

      <TooltipProvider>
        <div className="flex-1 cursor-default select-none px-8 pb-8 font-['Geist_Sans']">
          <Tabs defaultValue="links" className="flex h-full flex-col">
            <TabsList className="grid w-80 grid-cols-2">
              <TabsTrigger value="links">Criação de Links</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="links" className="flex-1">
              <LinksPage />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsPage />
            </TabsContent>
          </Tabs>

          <Toaster />
        </div>
      </TooltipProvider>
    </>
  )
}

export default App
