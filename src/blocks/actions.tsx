import { CaseSensitive, CaseUpper, Link, MessageSquareShare, MonitorDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  handleAdjustLinkMessage,
  handleCreateLink,
  handleDownloadVideoMessage,
  handleSetNameCase,
  handleSetUppercase,
} from './actionsHandlers'

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
              <Link className="scale-110" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Criar link no Alboom</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleAdjustLinkMessage}>
              <MessageSquareShare className="scale-110" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Ajustar mensagem do link</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleDownloadVideoMessage}>
              <MonitorDown className="scale-110" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Mensagem para video de download</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleSetUppercase}>
              <CaseUpper className="scale-[130%]" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Área de transferência para caixa alta</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline" className="p-8" onClick={handleSetNameCase}>
              <CaseSensitive className="scale-[130%]" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>Área de transferência para formato de títulos</TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  )
}
