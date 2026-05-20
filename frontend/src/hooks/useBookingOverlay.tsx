import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface BookingOverlayContextValue {
  isOpen: boolean
  openBooking: () => void
  closeBooking: () => void
}

const BookingOverlayContext = createContext<BookingOverlayContextValue | null>(null)

export function BookingOverlayProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(location.hash === '#booking')
  const previousHashRef = useRef(location.hash)
  const previousRouteKeyRef = useRef(`${location.pathname}${location.search}`)

  useEffect(() => {
    if (location.hash === '#booking') {
      setIsOpen(true)
    } else if (previousHashRef.current === '#booking') {
      setIsOpen(false)
    }

    previousHashRef.current = location.hash
  }, [location.hash])

  useEffect(() => {
    const nextRouteKey = `${location.pathname}${location.search}`

    if (previousRouteKeyRef.current !== nextRouteKey) {
      previousRouteKeyRef.current = nextRouteKey

      if (location.hash !== '#booking') {
        setIsOpen(false)
      }
    }
  }, [location.hash, location.pathname, location.search])

  const openBooking = () => {
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)

    if (location.hash === '#booking') {
      void navigate(
        {
          pathname: location.pathname,
          search: location.search,
          hash: '',
        },
        { replace: true },
      )
    }
  }

  return (
    <BookingOverlayContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
    </BookingOverlayContext.Provider>
  )
}

export function useBookingOverlay() {
  const context = useContext(BookingOverlayContext)

  if (!context) {
    throw new Error('useBookingOverlay must be used within BookingOverlayProvider')
  }

  return context
}
