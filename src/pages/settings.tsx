import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  authorization: z.string().nonempty(),
})

export function SettingsPage() {
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
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Criação de Links</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
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
