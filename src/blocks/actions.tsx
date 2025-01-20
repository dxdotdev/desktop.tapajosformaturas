import { open as openDialog } from '@tauri-apps/plugin-dialog'
import { readDir } from '@tauri-apps/plugin-fs'
import { openUrl } from '@tauri-apps/plugin-opener'
import { platform } from '@tauri-apps/plugin-os'
import { Link } from 'lucide-react'
import { toast } from 'sonner'
import { ulid } from 'ulid'

import { alboom } from '@/lib/alboom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const validationRegex = /[\wÀ-ú ]*(\d{4}|\( \d{2}\.\d{2}\.\d{4} \))? - .*$/
const pathSeparator = platform() === 'windows' ? '\\' : '/'
const createLinkRequestValues = {
  // biome-ignore lint/style/useNamingConvention:
  photographed_at: null,
  message: 'Bem-vindo(a) ao sistema de visualização e aprovação de fotos.',
  // biome-ignore lint/style/useNamingConvention:
  download_photo_option_value: 'DOWNLOAD_ALL',
  downloadable: true,
  // biome-ignore lint/style/useNamingConvention:
  single_download: false,
  commentable: false,
  shareable: false,
  // biome-ignore lint/style/useNamingConvention:
  selection_limit: null,
  // biome-ignore lint/style/useNamingConvention:
  category_id: 124404,
  // biome-ignore lint/style/useNamingConvention:
  exhibition_size_id: 5,
  // biome-ignore lint/style/useNamingConvention:
  selection_limit_date: null,
  // biome-ignore lint/style/useNamingConvention:
  selection_limit_additional: null,
  // biome-ignore lint/style/useNamingConvention:
  selection_limit_additional_value: null,
  currency: null,
  // biome-ignore lint/style/useNamingConvention:
  watermark_enabled: false,
  // biome-ignore lint/style/useNamingConvention:
  reminder_kind: 'NONE',
  // biome-ignore lint/style/useNamingConvention:
  collection_sell_attributes: { buy_from: 0, disabled: true },
  // biome-ignore lint/style/useNamingConvention:
  selection_min: null,
  // biome-ignore lint/style/useNamingConvention:
  selection_quantity_type: 'unlimited',
}

async function handleCreateLink() {
  try {
    const folderPath = await openDialog({ title: 'Criar Link', directory: true, multiple: false })
    if (folderPath === null) throw Error('Erro ao ler pasta selecionada!')

    const main = folderPath.match(validationRegex)?.at(0)
    let elementName = folderPath.split(pathSeparator).reverse().at(0)?.trim()
    if (main === undefined || elementName === undefined) throw Error('Pasta inválida ou mal formatada!')
    let info: string | undefined

    switch (true) {
      case /\\|\//.test(main):
        info = main.split(pathSeparator).at(0)?.split('-').at(0)?.trim()
        break

      case /[\wÀ-ú ]* - [\wÀ-ú ]* \( [\wÀ-ú ]* \)$/.test(elementName):
        info = main.replace(' -', '').split('(').at(0)?.trim()
        break

      case /[\wÀ-ú ]*( \( \d{2}\.\d{2}\.\d{4} \))? - [\wÀ-ú ]*$/.test(elementName):
        info = main.split('-').at(0)?.trim()
        elementName = main.split('-').at(1)?.trim() ?? ''
        break

      case /[\wÀ-ú ]* OUTORGA \( \d{2}\.\d{2}\.\d{4} \)/.test(folderPath ?? ''):
        info = elementName.split(pathSeparator).reverse().at(2)?.trim()
        break

      default:
        info = prompt('Informação da pasta') ?? ''
        break
    }

    if (!info || info.length === 0) throw Error('Informação do link inválida!')

    const { data } = await alboom.post('/collections', {
      collection: {
        name: `${info.trim()} - ${elementName.trim()}`.toUpperCase(),
        // biome-ignore lint/style/useNamingConvention:
        friendly_url: ulid(),
        ...createLinkRequestValues,
      },
    })

    const eventFolders = await readDir(folderPath)

    eventFolders.map((event) => {
      if (event.isDirectory)
        alboom.post(`/collections/${data.collection.id}/folders/`, {
          name: event.name.indexOf('-') !== -1 ? event.name.split('-').at(0) : event.name,
        })
    })

    toast.success('Link criado com sucesso!')

    openUrl(
      `https://proof.alboompro.com/selection/images/${data.collection.id}`,
      localStorage.getItem('openWithBrowser') ?? '',
    ).catch((error) => {
      throw Error(`Erro ao abrir navegador: ${error}`)
    })
  } catch (error) {
    toast.error(`${error}`)
  }
}

export function Actions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>Ações rápidas</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleCreateLink}>
              <Link />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Criar link no Alboom</TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  )
}
