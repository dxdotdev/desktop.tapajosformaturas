import '@/index.css'

import { SquareUserRound, MessageSquareDashed } from 'lucide-react'
import { toast } from 'sonner'
import { writeText as setClipboard, readText as getClipboard } from '@tauri-apps/plugin-clipboard-manager'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

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

function handleFixMessage() {
  getClipboard()
    .then((content) => {
      const result = content.replace('para seleção', 'para serem baixadas').replace('a seleção de', 'o download das')

      setClipboard(result)
        .then(() => toast.success('Texto copiado para a Área de Transferência!'))
        .catch((error) => toast.error(`Erro ao copiar para a Área de Transferência: ${error}`))
    })
    .catch((error) => toast.error(`Falha ao ler a Área de Transferência: ${error}`))
}

function App() {
  return (
    <TooltipProvider>
      <div className="space-y-4 px-6 py-4">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="p-8" onClick={handleSetContact}>
                  <SquareUserRound />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Renomear contato</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="p-8" onClick={handleFixMessage}>
                  <MessageSquareDashed />
                </Button>
              </TooltipTrigger>

              <TooltipContent>Ajustar mensagem de download</TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </TooltipProvider>
  )
}

export default App
