import client from './client'
import type { PointOfInterest } from '@/types/api'

export const getPois = (): Promise<PointOfInterest[]> =>
  client.get<PointOfInterest[]>('/pois').then(r => r.data)
