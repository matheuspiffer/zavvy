import { useState, useEffect } from 'react'
import { useSession } from './lib/auth'
import { LoginPage } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

function App() {
  const { data: session, isPending } = useSession()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setIsAuthenticated(true)
    } else if (!isPending) {
      setIsAuthenticated(false)
    }
  }, [session, isPending])

  if (isPending) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />
}

export default App
