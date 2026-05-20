import { createContext, useContext, useState, useEffect, useRef, ReactNode, createElement } from 'react'
import { getMe, login as apiLogin, logout as apiLogout } from '@/api/auth'

interface AuthContextType {
  isAuthenticated: boolean | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const authRequestIdRef = useRef(0)

  useEffect(() => {
    let mounted = true
    const requestId = ++authRequestIdRef.current

    getMe()
      .then(() => {
        if (mounted && authRequestIdRef.current === requestId) {
          setIsAuthenticated(true)
        }
      })
      .catch(() => {
        if (mounted && authRequestIdRef.current === requestId) {
          setIsAuthenticated(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    authRequestIdRef.current += 1
    await apiLogin(email, password)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    authRequestIdRef.current += 1
    await apiLogout()
    setIsAuthenticated(false)
  }

  return createElement(AuthContext.Provider, { value: { isAuthenticated, login, logout } }, children)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
