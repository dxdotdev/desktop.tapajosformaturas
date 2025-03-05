import { Link, Settings } from 'lucide-react'

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
