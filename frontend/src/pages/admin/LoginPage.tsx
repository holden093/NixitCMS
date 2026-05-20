import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AdminButton,
  AdminInput,
  AdminPasswordField,
} from '@/components/admin/ui'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { extractErrorMessage } from '@/utils/errors'

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useDocumentTitle('Login — Admin')

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated === null) {
    return null
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(extractErrorMessage(err, 'Credenziali non valide'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper px-6 py-10 text-ink">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden border border-line bg-stone-50 p-10 lg:block">
             <p className="eyebrow">Hotel CMS</p>
            <h1 className="display-title mt-6">
              CMS per contenuti, brand e operativita del sito.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
              Accedi al pannello di amministrazione per gestire testi pubblici, media, servizi, configurazione booking e identita visiva dell&apos;hotel.
            </p>
          </div>

          <div className="border border-line bg-paper p-8 text-ink md:p-10">
            <p className="eyebrow">Admin access</p>
            <h2 className="mt-4 text-h2 font-semibold text-ink">
              Accedi al CMS
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Usa le credenziali amministrative per entrare nel workspace editoriale e operativo del progetto.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block space-y-2">
                <span className="eyebrow">Email</span>
                <AdminInput
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  startIcon="mail"
                  autoComplete="email"
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'login-error' : undefined}
                />
              </label>

              <label className="block space-y-2">
                <span className="eyebrow">Password</span>
                <AdminPasswordField
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'login-error' : undefined}
                />
              </label>

              {error && <p id="login-error" className="border border-line bg-stone-100 px-4 py-3 text-sm text-ink">{error}</p>}

              <AdminButton type="submit" loading={submitting} className="w-full py-3">
                {submitting ? 'Accesso in corso...' : 'Entra nel CMS'}
              </AdminButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
