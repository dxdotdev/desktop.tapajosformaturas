import { GalleryVerticalEnd } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavOther } from '@/components/nav-other'
import { NavUser } from '@/components/nav-user'
import { ContextSwitcher } from '@/components/context-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { Separator } from './ui/separator'

const data = {
  user: {
    name: 'Davi Reis',
    title: 'desenvolvedor',
  },
  contexts: [
    {
      name: 'UNAMA 1126',
      logo: GalleryVerticalEnd,
      plan: 'Farmacia',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ContextSwitcher contexts={data.contexts} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain />

        <Separator className="hidden self-center group-data-[collapsible=icon]:block group-data-[collapsible=icon]:max-w-7" />

        <NavOther />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
