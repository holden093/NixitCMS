import type { Service } from '@/types/api'
import type { ServiceInput } from '@/api/admin/services'

export type ServiceForm = Omit<ServiceInput, 'photoCategoryId' | 'previewMediaId'> & {
  photoCategoryId: string
  previewMediaId: string
}

export function createEmptyServiceForm(): ServiceForm {
  return {
    name_it: '',
    name_en: '',
    description_it: '',
    description_en: '',
    isPublic: true,
    sortOrder: 0,
    photoCategoryId: '',
    previewMediaId: '',
  }
}

export function mapServiceToForm(service: Service): ServiceForm {
  return {
    name_it: service.name_it,
    name_en: service.name_en,
    description_it: service.description_it,
    description_en: service.description_en,
    isPublic: service.isPublic,
    sortOrder: service.sortOrder,
    photoCategoryId: service.photoCategoryId != null ? String(service.photoCategoryId) : '',
    previewMediaId: service.previewMediaId != null ? String(service.previewMediaId) : '',
  }
}

export function toServicePayload(form: ServiceForm): ServiceInput {
  return {
    ...form,
    photoCategoryId: form.photoCategoryId ? Number(form.photoCategoryId) : null,
    previewMediaId: form.previewMediaId ? Number(form.previewMediaId) : null,
  }
}
