import { signOut, useSession } from '../lib/auth'

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut()
    onLogout()
  }

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #eee',
      }}>
        <h1 style={{ margin: 0 }}>Zavvy Admin</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#666' }}>
            {session?.user?.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#eee',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h2>Welcome to Zavvy Admin Panel</h2>
          <p style={{ color: '#666' }}>
            Manage templates, tenants, and system monitoring from here.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Tenants</h3>
              <p style={{ color: '#666', margin: 0 }}>Coming soon</p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Templates</h3>
              <p style={{ color: '#666', margin: 0 }}>Coming soon</p>
            </div>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Monitoring</h3>
              <p style={{ color: '#666', margin: 0 }}>Coming soon</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
