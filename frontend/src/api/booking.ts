import client from './client'
import type { AvailabilityResult, BookingProvider } from '@/types/api'

export const getActiveBookingProvider = () =>
  client.get<BookingProvider | null>('/booking').then(r => r.data)

export const getAvailability = (params: {
  providerId: number
  checkIn: string
  checkOut: string
  guests: number
}) =>
  client.get<AvailabilityResult>('/availability', { params }).then(r => r.data)
