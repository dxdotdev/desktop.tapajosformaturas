import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import type { ReactNode } from 'react'

function Trigger({ value, children }: { value: string; children: ReactNode }) {
  return (
    <TabsTrigger
      className="rounded-md px-3 py-2 text-left font-normal text-sm data-[state=active]:bg-sidebar"
      value={value}
    >
      {children}
    </TabsTrigger>
  )
}

export function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Tabs className="flex gap-12" orientation="vertical" defaultValue="links">
        <TabsList className="flex w-90 flex-col gap-2">
          <Trigger value="links">Envio de Links</Trigger>
        </TabsList>

        <TabsContent value="links" className="w-full">
          <Card className="bg-sidebar">
            <CardHeader>
              <CardTitle className="text-xl">Envio de Links</CardTitle>
              <CardDescription>Modifique as configurações do ambiente de Envio de Links.</CardDescription>
            </CardHeader>

            <CardContent>
              <p>Card Content</p>
            </CardContent>

            <CardFooter className="justify-end">
              <Button className="font-medium">Salvar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
