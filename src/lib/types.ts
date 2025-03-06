import type { LucideIcon } from 'lucide-react'

import { SIDEBAR_NAV_CONTENT } from '@/lib/constants'

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Contract = `${Digit}${Digit}${Digit}${Digit}`

export type Institution = 'UNAMA' | 'IESPES' | 'CEPES' | 'UNIP' | 'UFOPA' | 'UEPA' | 'IFPA'

export type Course =
  | 'Medicina'
  | 'Enfermagem'
  | 'Técnico em Enfermagem'
  | 'Pedagogia'
  | 'Psicologia'
  | 'Farmácia'
  | 'Direito'
  | 'Engenharia Civil'

export type Context = {
  institution: Institution
  contract: Contract
  course: Course
  icon: LucideIcon
}

const labels = SIDEBAR_NAV_CONTENT.pages.map((p) => p.label)
export type Page = (typeof labels)[number]
