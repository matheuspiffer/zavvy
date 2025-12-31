import { createFileRoute, Link } from '@tanstack/react-router'
import { ProtectedRoute } from './__root'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@zavvy/ui'
import { OrganizationTable } from '../features/organizations'

export const Route = createFileRoute('/organizations')({
  component: () => (
    <ProtectedRoute>
      <OrganizationsPage />
    </ProtectedRoute>
  ),
})

function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              ← Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Organizações</h1>
        </div>
      </header>

      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Todas as Organizações</CardTitle>
            <CardDescription>
              Visualize e gerencie todas as organizações cadastradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationTable />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
