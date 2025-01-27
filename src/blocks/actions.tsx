import { readText as getClipboard, writeText as setClipboard } from '@tauri-apps/plugin-clipboard-manager'
import { open as openDialog } from '@tauri-apps/plugin-dialog'
import { readDir, rename as renameDir } from '@tauri-apps/plugin-fs'
import { platform } from '@tauri-apps/plugin-os'
import dayjs from 'dayjs'
import { BookUser, CaseUpper, Link, MessageSquareShare, MonitorDown } from 'lucide-react'
import { toast } from 'sonner'
import { ulid } from 'ulid'

import { alboom } from '@/lib/alboom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const validationRegex = /[\wÀ-úºª ]*(\d{4}|\( \d{2}\.\d{2}\.\d{4} \))? - .*$/
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

async function createLink(folderPath: string | null) {
  try {
    if (folderPath === null) throw Error('Erro ao ler pasta selecionada!')

    const main = folderPath.match(validationRegex)?.at(0)
    let elementName = folderPath.split(pathSeparator).reverse().at(0)?.trim()
    if (main === undefined || elementName === undefined) throw Error('Pasta inválida ou mal formatada!')
    let info: string | undefined

    switch (true) {
      case /\\|\//.test(main):
        info = main.split(pathSeparator).at(0)?.split('-').at(0)?.trim()
        break

      case /[\wÀ-úºª ]* - [\wÀ-ú ]* \( [\wÀ-ú ]* \)$/.test(elementName):
        info = main.replace(' -', '').split('(').at(0)?.trim()
        break

      case /[\wÀ-úºª ]*( \( \d{2}\.\d{2}\.\d{4} \))? - [\wÀ-ú ]*$/.test(elementName):
        info = main.split('-').at(0)?.trim()
        elementName = main.split('-').at(1)?.trim() ?? ''
        break

      case /[\wÀ-úºª ]* OUTORGA \( \d{2}\.\d{2}\.\d{4} \)/.test(folderPath ?? ''):
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
    const date = dayjs(new Date()).format('DD.MM.YYYY')

    eventFolders.map(async (folder) => {
      if (folder.isDirectory) {
        alboom.post(`/collections/${data.collection.id}/folders/`, {
          name: folder.name.indexOf('-') !== -1 ? folder.name.split('-').at(0) : folder.name,
        })

        const newName =
          folder.name.indexOf('-') === -1
            ? folder.name.concat(`- ENVIADO ${date}`)
            : (folder.name.split('-').at(0)?.concat(`- ENVIADO ${date}`) ?? '')

        renameDir(`${folderPath}${pathSeparator}${folder.name}`, `${folderPath}${pathSeparator}${newName}`).catch(
          (error) => {
            throw Error(`Erro renomear pastas: ${error}`)
          },
        )
      }
    })

    const url = `https://proof.alboompro.com/selection/images/${data.collection.id}`

    setClipboard(url)
      .then(() => toast.success('Link copiado para a Área de Transferência!'))
      .catch((error) => toast.error(`Erro ao copiar link para a Área de Transferência: ${error}`))

    toast.success('Link criado com sucesso!')
  } catch (error) {
    toast.error(`${error}`)
  }
}

async function handleCreateLink() {
  const folderPath = await openDialog({ title: 'Criar Link', directory: true, multiple: false })
  await createLink(folderPath)
}

async function handleSetUppercase() {
  const clipboard = await getClipboard()
  await setClipboard(clipboard.toUpperCase())
}

function handleSetContact() {
  getClipboard()
    .then((content) => {
      const lower = (s: string) => s.toLowerCase()
      const upper = (s: string) => s.toUpperCase()
      const nameCase = (s: string) =>
        lower(s)
          .replace(/(^|\s)\w/g, (s) => upper(s))
          .replace(/\sd?\ws?(\s|$)/g, (s) => lower(s))
      const formattedContent = nameCase(content)
      const [info, name] = formattedContent.split('-')
      const result = name === undefined ? formattedContent : `${name.trim()} | ${info.trim().toUpperCase()}`
      setClipboard(result)
        .then(() => toast.success('Contato copiado para a Área de Transferência!'))
        .catch((error) => toast.error(`Erro ao copiar para a Área de Transferência: ${error}`))
    })
    .catch((error) => toast.error(`Falha ao ler a Área de Transferência: ${error}`))
}

function handleAdjustDownloadMessage() {
  getClipboard().then((content) =>
    setClipboard(content.replace('para seleção', 'para serem baixadas').replace('a seleção de', 'o download das'))
      .then(() => toast.success('Mensagem copiada para a Área de Transferência!'))
      .catch((error) => toast.error(`Erro ao copiar mensagem para a Área de Transferência: ${error}`)),
  )
}

function handleVideoMessage() {
  getClipboard().then(() =>
    setClipboard('Aqui estão as instruções para baixar as fotos')
      .then(() => toast.success('Mensagem copiada para a Área de Transferência!'))
      .catch((error) => toast.error(`Erro ao copiar mensagem para a Área de Transferência: ${error}`)),
  )
}

export function Actions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações</CardTitle>
        <CardDescription>Ações rápidas</CardDescription>
      </CardHeader>

      <CardContent className="space-x-2">
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleCreateLink}>
              <Link />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Criar link no Alboom</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleSetUppercase}>
              <CaseUpper className="scale-125" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Área de transferência para caixa alta</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleSetContact}>
              <BookUser />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Ajustar nome de contato</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleAdjustDownloadMessage}>
              <MessageSquareShare />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Ajustar mensagem de download</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleVideoMessage}>
              <MonitorDown />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Mensagem para video de download</TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  )
}
