import { createFileRoute, Link } from '@tanstack/react-router'
import { ProtectedRoute } from './__root'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@zavvy/ui'
import { TemplateTable } from '../features/templates'

export const Route = createFileRoute('/templates')({
  component: () => (
    <ProtectedRoute>
      <TemplatesPage />
    </ProtectedRoute>
  ),
})

function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              ← Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Templates WhatsApp</h1>
        </div>
      </header>

      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Templates</CardTitle>
            <CardDescription>
              Crie, edite e gerencie templates de mensagens WhatsApp para aprovação da Meta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TemplateTable />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
