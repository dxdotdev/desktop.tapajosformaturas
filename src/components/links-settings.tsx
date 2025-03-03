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
})

export function LinksSettings() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorization: localStorage.getItem('alboomAuthorizationToken') ?? '',
    },
  })

  function handleSubmit(form: z.infer<typeof formSchema>) {
    localStorage.setItem('alboomAuthorizationToken', form.authorization)

    toast.success('Configurações salvas!')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="bg-sidebar">
          <CardHeader>
            <CardTitle className="text-xl">Envio de Links</CardTitle>
            <CardDescription>Modifique as configurações do ambiente de Envio de Links.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <FormField
              name="authorization"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token de Autenticação API Alboom</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit" className="font-medium">
              Salvar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
