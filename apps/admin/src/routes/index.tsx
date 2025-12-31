import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { signOut, useSession } from '../lib/auth'
import { ProtectedRoute } from './__root'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@zavvy/ui'

export const Route = createFileRoute('/')({
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
})

function DashboardPage() {
  const navigate = useNavigate()
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut()
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Zavvy Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">{session?.user?.email}</span>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao Painel Admin Zavvy</CardTitle>
            <CardDescription>
              Gerencie templates, organizações e monitoramento do sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/organizations" className="block">
                <Card className="bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Organizações</CardTitle>
                    <CardDescription>Gerenciar organizações cadastradas</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/templates" className="block">
                <Card className="bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">Templates</CardTitle>
                    <CardDescription>Gerenciar templates WhatsApp</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Card className="bg-muted/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Monitoramento</CardTitle>
                  <CardDescription>Em breve</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
