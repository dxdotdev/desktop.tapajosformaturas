import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  authorization: z.string().nonempty(),
  browser: z.string().nonempty(),
})

export function Settings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorization: localStorage.getItem('alboomAuthorizationToken') ?? '',
      browser: localStorage.getItem('openWithBrowser') ?? '',
    },
  })

  function handleSubmit(form: z.infer<typeof formSchema>) {
    localStorage.setItem('alboomAuthorizationToken', form.authorization)
    localStorage.setItem('openWithBrowser', form.browser)

    toast.success('Configurações salvas!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription>Configurações necessárias para as Ações</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-2">
            <h2>Criar Links</h2>

            <FormField
              name="authorization"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authorization</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="browser"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navegador</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" className="ml-auto">
              Salvar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
