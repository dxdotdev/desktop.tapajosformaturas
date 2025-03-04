import { atom } from 'jotai'

import type { Context, Page } from '@/lib/constants'
import { GalleryVerticalEnd } from 'lucide-react'

export const currentPageAtom = atom<Page>('links')

export const dataAtom = atom({
  user: {
    name: 'Davi Reis',
    title: 'desenvolvedor',
  },
})

export const recentContextsAtom = atom<Context[]>([
  {
    institution: 'UNAMA',
    contractNumber: '1111',
    course: 'Farmácia',
    icon: GalleryVerticalEnd,
  },
])

export const currentContextAtom = atom<Context>({
  institution: 'UNAMA',
  contractNumber: '1111',
  course: 'Farmácia',
  icon: GalleryVerticalEnd,
})
