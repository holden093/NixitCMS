import axios from 'axios'
import { normalizeBaseUrl } from './baseUrl'

const client = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL, '/api'),
  withCredentials: true,
  timeout: 30_000,
})

client.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    const requestUrl = typeof error.config?.url === 'string' ? error.config.url : ''
    const isAdminArea = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')
    const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login'
    const isLoginRequest = requestUrl.includes('/auth/login')

    if (status === 401 && isAdminArea && !isLoginPage && !isLoginRequest) {
      window.location.assign('/admin/login')
    }

    return Promise.reject(error)
  },
)

export default client
