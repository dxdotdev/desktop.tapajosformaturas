import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useAtom } from 'jotai'

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
import { SIDEBAR_NAV_CONTENT } from '@/lib/constants'
import { currentPageAtom } from '@/lib/state'

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [currentPage] = useAtom(currentPageAtom)

  return (
    <Sidebar collapsible="icon" {...props} className="text-nowrap">
      <SidebarHeader>
        <ContextSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {SIDEBAR_NAV_CONTENT.sections.map((section) => (
          <>
            {SIDEBAR_NAV_CONTENT.sections.indexOf(section) >= 1 && (
              <Separator
                key={section.label}
                className="hidden max-w-6 self-center group-data-[collapsible=icon]:block"
              />
            )}

            <SidebarGroup key={section.label}>
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>

              <SidebarMenu>
                <TabsList>
                  {SIDEBAR_NAV_CONTENT.pages.map(
                    (page) =>
                      page.section === section.label && (
                        <SidebarMenuItem key={page.label}>
                          <TabsTrigger value={page.label} asChild>
                            <SidebarMenuButton isActive={page.label === currentPage}>
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
