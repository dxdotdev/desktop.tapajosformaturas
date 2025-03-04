import '@/index.css'
import '@fontsource/outfit/100.css'
import '@fontsource/outfit/200.css'
import '@fontsource/outfit/300.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import '@fontsource/outfit/700.css'
import '@fontsource/outfit/800.css'
import '@fontsource/outfit/900.css'

import { getCurrentWindow } from '@tauri-apps/api/window'
import { useAtom } from 'jotai'
import { Minus, Square, X } from 'lucide-react'
import { Toaster } from 'sonner'

import { LinksPage } from '@/app/links'
import { SettingsPage } from '@/app/settings'
import { AppSidebar } from '@/components/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { type Page, SIDEBAR_NAV_CONTENT } from '@/lib/constants'
import { currentPageAtom } from '@/lib/state'

function App() {
  const window = getCurrentWindow()
  const minimize = () => window.minimize()
  const toggleMaximize = () => window.toggleMaximize()
  const close = () => window.close()

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  return (
    <>
      <Tabs defaultValue={currentPage} onValueChange={(value) => setCurrentPage(value as Page)}>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset>
            <header
              data-tauri-drag-region
              className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
            >
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />

                <Separator orientation="vertical" className="mr-2 h-4" />

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbPage>
                        {SIDEBAR_NAV_CONTENT.pages.filter((p) => p.label === currentPage)[0].title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="space-x-1">
                <Button variant="ghost" size="icon" className="size-7" onClick={minimize}>
                  <Minus />
                </Button>

                <Button variant="ghost" size="icon" className="size-7" onClick={toggleMaximize}>
                  <Square className="scale-75" />
                </Button>

                <Button variant="ghost" size="icon" className="size-7 hover:bg-destructive" onClick={close}>
                  <X />
                </Button>
              </div>
            </header>

            <TabsContent value="links" asChild>
              <LinksPage />
            </TabsContent>

            <TabsContent value="settings" asChild>
              <SettingsPage />
            </TabsContent>
          </SidebarInset>
        </SidebarProvider>
      </Tabs>

      <Toaster />
    </>
  )
}

export default App
