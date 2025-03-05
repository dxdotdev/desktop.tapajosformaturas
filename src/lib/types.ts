import type { LucideIcon } from 'lucide-react'

import { SIDEBAR_NAV_CONTENT } from '@/lib/constants'

const labels = SIDEBAR_NAV_CONTENT.pages.map((p) => p.label)
export type Page = (typeof labels)[number]

export type Context = {
  institution: string
  contractNumber: string
  course: string
  icon: LucideIcon
}
