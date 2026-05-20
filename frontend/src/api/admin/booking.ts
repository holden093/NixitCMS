import client from '../client'
import type { BookingProvider, BookingProviderInput } from '@/types/api'

export const getBookingProviders = () =>
  client.get<BookingProvider[]>('/admin/booking').then(r => r.data)

export const createBookingProvider = (data: BookingProviderInput) =>
  client.post<BookingProvider>('/admin/booking', data).then(r => r.data)

export const updateBookingProvider = (id: number, data: Partial<BookingProviderInput>) =>
  client.put<BookingProvider>(`/admin/booking/${id}`, data).then(r => r.data)

export const deleteBookingProvider = (id: number) =>
  client.delete(`/admin/booking/${id}`).then(r => r.data)
