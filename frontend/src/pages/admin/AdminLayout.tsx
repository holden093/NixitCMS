import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AdminIcon, AdminScrollArea, type AdminIconName } from '@/components/admin/ui'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { to: 'dashboard', label: 'Panoramica', icon: 'layout-dashboard' },
  { to: 'content', label: 'Sito pubblico', icon: 'globe-2' },
  { to: 'settings', label: 'Brand & impostazioni', icon: 'settings-2' },
  { to: 'pages', label: 'Visibilita pagine', icon: 'file-stack' },
  { to: 'media', label: 'Libreria media', icon: 'images' },
  { to: 'news', label: 'News', icon: 'newspaper' },
  { to: 'rooms', label: 'Camere', icon: 'building-2' },
  { to: 'services', label: 'Servizi', icon: 'sparkles' },
  { to: 'pois', label: 'Punti di interesse', icon: 'map-pinned' },
  { to: 'booking', label: 'Booking', icon: 'calendar-cog' },
] as const satisfies ReadonlyArray<{
  to: string
  label: string
  icon: AdminIconName
}>

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/admin/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-paper px-6 py-10 text-ink">
        <div className="mx-auto flex max-w-5xl items-center justify-center py-24">
          <div className="space-y-4 text-center">
            <p className="eyebrow">Hotel CMS</p>
            <h1 className="text-h2 font-semibold text-ink">CMS Workspace</h1>
            <p className="text-sm leading-6 text-muted">
              Caricamento dell&apos;ambiente di amministrazione.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1720px]">
        <aside className="hidden w-[18rem] shrink-0 border-r border-line bg-stone-50 text-ink lg:flex lg:flex-col">
          <div className="border-b border-line px-6 py-6">
            <p className="eyebrow">Hotel CMS</p>
            <h1 className="mt-2 text-h2 font-semibold text-ink">Admin</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              Gestisci contenuti, media, brand e configurazione pubblica.
            </p>
          </div>

          <AdminScrollArea className="flex-1" viewportClassName="h-full px-3 py-4">
            <nav className="space-y-0.5">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={`/admin/${item.to}`}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 border-l-2 px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'border-ink bg-stone-100 text-ink'
                        : 'border-transparent text-muted hover:bg-stone-100 hover:text-ink'
                    }`
                  }
                >
                  <AdminIcon name={item.icon} className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </AdminScrollArea>

          <div className="border-t border-line p-4">
            <button
              type="button"
              onClick={() => logout().then(() => navigate('/admin/login', { replace: true }))}
              className="btn-secondary w-full"
            >
              <AdminIcon name="log-out" className="h-4 w-4" />
              Esci dal CMS
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-line bg-paper px-5 py-4 md:px-8 lg:px-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="eyebrow">CMS Workspace</p>
                <p className="text-sm leading-6 text-muted">
                  Ambiente editoriale per sito pubblico, brand, media e configurazione operativa.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Apri sito pubblico
                </a>
                <button
                  type="button"
                  onClick={() => logout().then(() => navigate('/admin/login', { replace: true }))}
                  className="btn-primary lg:hidden"
                >
                  Esci
                </button>
              </div>
            </div>

            <div className="mt-4 lg:hidden">
              <AdminScrollArea orientation="horizontal" viewportClassName="w-full">
                <nav className="flex min-w-max gap-1 pb-1">
                  {navItems.map(item => (
                    <NavLink
                      key={item.to}
                      to={`/admin/${item.to}`}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? 'border-ink text-ink'
                            : 'border-transparent text-muted hover:text-ink'
                        }`
                      }
                    >
                      <AdminIcon name={item.icon} className="h-4 w-4" />
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </AdminScrollArea>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
