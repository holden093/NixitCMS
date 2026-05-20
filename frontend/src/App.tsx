import { Suspense, lazy, useEffect, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import i18n, { normalizeLocale, resolveLocale } from '@/i18n'
import { AuthProvider } from '@/hooks/useAuth'
import { BookingOverlayProvider } from '@/hooks/useBookingOverlay'
import BookingOverlay from '@/components/booking/BookingOverlay'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import { usePublicShellModel } from '@/hooks/usePublicShellModel'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactsPage = lazy(() => import('@/pages/ContactsPage'))
const NewsPage = lazy(() => import('@/pages/NewsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const RoomsPage = lazy(() => import('@/pages/RoomsPage'))
const RoomPage = lazy(() => import('@/pages/RoomPage'))
const ServicePage = lazy(() => import('@/pages/ServicePage'))
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'))
const LoginPage = lazy(() => import('@/pages/admin/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/admin/dashboard'))
const SettingsPage = lazy(() => import('@/pages/admin/settings'))
const PagesPage = lazy(() => import('@/pages/admin/pages'))
const ContentPage = lazy(() => import('@/pages/admin/content'))
const MediaPage = lazy(() => import('@/pages/admin/media'))
const PoisPage = lazy(() => import('@/pages/admin/pois'))
const AdminRoomsPage = lazy(() => import('@/pages/admin/rooms'))
const ServicesPage = lazy(() => import('@/pages/admin/services'))
const BookingPage = lazy(() => import('@/pages/admin/booking'))
const AdminNewsPage = lazy(() => import('@/pages/admin/news'))

function FullScreenLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-md border border-line bg-paper p-8 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-ink" />
        <p className="eyebrow mt-4">Loading</p>
      </div>
    </div>
  )
}

function PageLoadingState() {
  return (
    <div className="page-grid pb-16 pt-[var(--public-fixed-offset)]">
      <div className="animate-pulse">
        <div className="h-3 w-24 bg-stone-200" />
        <div className="mt-6 h-10 w-3/4 bg-stone-200" />
        <div className="mt-8 h-32 bg-stone-100" />
      </div>
    </div>
  )
}

function withSuspense(node: ReactNode, fallback: ReactNode = <PageLoadingState />) {
  return (
    <Suspense fallback={fallback}>
      {node}
    </Suspense>
  )
}

function LanguageRuntimeSync() {
  const location = useLocation()

  useEffect(() => {
    const nextLocale = resolveLocale(location.search)
    const currentLocale = normalizeLocale(i18n.resolvedLanguage ?? i18n.language)

    if (currentLocale !== nextLocale) {
      void i18n.changeLanguage(nextLocale)
    }
  }, [location.search])

  return null
}

function PublicLayout() {
  const shell = usePublicShellModel()

  return (
    <BookingOverlayProvider>
      <div className={`public-site flex min-h-screen flex-col ${shell.promo.isVisible ? 'public-site-with-promo' : ''}`}>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
        <BookingOverlay />
      </div>
    </BookingOverlayProvider>
  )
}

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <LanguageRuntimeSync />
          <div className="min-h-screen flex flex-col">
            <Routes>
              {/* Admin routes — no public Navbar */}
              <Route path="/admin/login" element={withSuspense(<LoginPage />, <FullScreenLoadingState />)} />
              <Route path="/admin" element={withSuspense(<AdminLayout />, <FullScreenLoadingState />)}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={withSuspense(<DashboardPage />)} />
                <Route path="settings" element={withSuspense(<SettingsPage />)} />
                <Route path="pages" element={withSuspense(<PagesPage />)} />
                <Route path="content" element={withSuspense(<ContentPage />)} />
                <Route path="media" element={withSuspense(<MediaPage />)} />
                <Route path="pois" element={withSuspense(<PoisPage />)} />
                <Route path="rooms" element={withSuspense(<AdminRoomsPage />)} />
                <Route path="services" element={withSuspense(<ServicesPage />)} />
                <Route path="booking" element={withSuspense(<BookingPage />)} />
                <Route path="news" element={withSuspense(<AdminNewsPage />)} />
              </Route>

              {/* Public routes — with Navbar/Footer */}
              <Route element={<PublicLayout />}>
                <Route index element={withSuspense(<HomePage />)} />
                <Route path="chi-siamo" element={withSuspense(<AboutPage />)} />
                <Route path="camere" element={withSuspense(<RoomsPage />)} />
                <Route path="camere/:slug" element={withSuspense(<RoomPage />)} />
                <Route path="contatti" element={withSuspense(<ContactsPage />)} />
                <Route path="news" element={withSuspense(<NewsPage />)} />
                <Route path="servizi/:slug" element={withSuspense(<ServicePage />)} />
                <Route path="*" element={withSuspense(<NotFoundPage />)} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '2px',
            fontSize: '13px',
            background: 'var(--color-ink)',
            color: 'var(--color-paper)',
          },
        }}
      />
    </>
  )
}
