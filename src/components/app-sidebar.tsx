import type { LucideIcon } from 'lucide-react'

import { ContextSwitcher } from '@/components/context-switcher'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'

type NavData = {
  sections: {
    title: string
    label: string
  }[]
  pages: {
    title: string
    label: string
    icon: LucideIcon
    section: string
  }[]
}

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

type Props = {
  navData: NavData
  data: Data
  activeTab: string
}

export function AppSidebar({ navData, data, activeTab, ...props }: Props & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ContextSwitcher contexts={data.contexts} />
      </SidebarHeader>

      <SidebarContent>
        {navData.sections.map((section) => (
          <>
            {navData.sections.indexOf(section) >= 1 && (
              <Separator
                key={section.title}
                className="hidden max-w-6 self-center group-data-[collapsible=icon]:block"
              />
            )}

            <SidebarGroup key={section.title}>
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>

              <SidebarMenu>
                <TabsList>
                  {navData.pages.map(
                    (page) =>
                      page.section === section.label && (
                        <SidebarMenuItem key={page.label}>
                          <TabsTrigger value={page.label} asChild>
                            <SidebarMenuButton isActive={page.label === activeTab}>
                              <page.icon /> {page.title}
                            </SidebarMenuButton>
                          </TabsTrigger>
                        </SidebarMenuItem>
                      ),
                  )}
                </TabsList>
              </SidebarMenu>
            </SidebarGroup>
          </>
        ))}
      </SidebarContent>

      {
        // <SidebarFooter>
        //   <NavUser user={data.user} />
        // </SidebarFooter>
      }
      <SidebarRail />
    </Sidebar>
  )
}
