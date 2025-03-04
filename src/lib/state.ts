import { atom } from 'jotai'

import type { Page } from '@/lib/constants'
import { GalleryVerticalEnd } from 'lucide-react'

export const currentPageAtom = atom<Page>('links')

export const dataAtom = atom({
  user: {
    name: 'Davi Reis',
    title: 'desenvolvedor',
  },
  recentContexts: [
    {
      name: 'UNAMA 1126',
      course: 'Farmacia',
      icon: GalleryVerticalEnd,
    },
  ],
})
