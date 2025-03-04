import { Link, type LucideIcon, Settings } from 'lucide-react'

export const SIDEBAR_NAV_CONTENT = {
  sections: [
    {
      title: 'Ambientes',
      label: 'environments',
    },
    {
      title: 'Outros',
      label: 'other',
    },
  ],
  pages: [
    {
      title: 'Envio de Links',
      label: 'links',
      icon: Link,
      section: 'environments',
    },
    {
      title: 'Configurações',
      label: 'settings',
      icon: Settings,
      section: 'other',
    },
  ],
} as const

const labels = SIDEBAR_NAV_CONTENT.pages.map((p) => p.label)
export type Page = (typeof labels)[number]

export type Context = {
  institution: string
  contractNumber: string
  course: string
  icon: LucideIcon
}
