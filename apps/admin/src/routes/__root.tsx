import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useSession } from '../lib/auth'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return <Outlet />
}

// Protected route wrapper - redirects to login if not authenticated
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !session?.user) {
      navigate({ to: '/login' })
    }
  }, [session, isPending, navigate])

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans">
        Carregando...
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return <>{children}</>
}
