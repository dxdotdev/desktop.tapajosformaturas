import type { LucideIcon } from 'lucide-react'

import { ContextSwitcher } from '@/components/context-switcher'
import { NavUser } from '@/components/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Separator } from './ui/separator'

type NavContent = {
  name: string
  pages: {
    name: string
    label: string
    icon: LucideIcon
  }[]
}[]

type Data = {
  user: {
    name: string
    title: string
  }
  contexts: {
    name: string
    icon: LucideIcon
    course: string
  }[]
}

export function AppSidebar({
  navContent,
  data,
  ...props
}: { navContent: NavContent; data: Data } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ContextSwitcher contexts={data.contexts} />
      </SidebarHeader>

      <SidebarContent>
        {navContent.map((section) => (
          <>
            {navContent.indexOf(section) > 0 && (
              <Separator
                key={section.name}
                className="hidden self-center group-data-[collapsible=icon]:block group-data-[collapsible=icon]:max-w-7"
              />
            )}

            <SidebarGroup key={section.name}>
              <SidebarGroupLabel>{section.name}</SidebarGroupLabel>

              <SidebarMenu>
                {section.pages.map((page) => (
                  <SidebarMenuItem key={page.name}>
                    <SidebarMenuButton>
                      <page.icon /> {page.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
