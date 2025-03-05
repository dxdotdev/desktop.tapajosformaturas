import * as dialog from '@tauri-apps/plugin-dialog'
import { useAtom } from 'jotai'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'

import { currentContextAtom, recentContextsAtom } from '@/lib/state'

export function ContextSwitcher() {
  const { isMobile } = useSidebar()
  const [recentContexts] = useAtom(recentContextsAtom)
  const [currentContext, setCurrentContext] = useAtom(currentContextAtom)

  const contextName = `${currentContext.institution} ${currentContext.contractNumber}`

  async function handleAddContext() {
    const folderPath = await dialog.open({
      title: 'Adicionar contexto',
      directory: true,
      multiple: false,
    })

    if (!folderPath) {
      toast.error('Selecione o caminho da pasta para adicionar um contexto!')
      return
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <currentContext.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{contextName}</span>
                <span className="truncate text-xs">{currentContext.course}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Recentes</DropdownMenuLabel>
            {recentContexts.map((context) => (
              <DropdownMenuItem key={contextName} onClick={() => setCurrentContext(context)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <context.icon className="size-4 shrink-0" />
                </div>

                {contextName}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2" onClick={handleAddContext}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>

              <div className="font-medium text-muted-foreground">Adicionar</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
