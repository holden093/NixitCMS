import type { PhotoCategoryInput } from '@/api/admin/photoCategories'
import type { PhotoCategoryWithCount } from '@/types/api'

export interface CategoryForm {
  name_it: string
  name_en: string
  sortOrder: number
}

export function createEmptyCategoryForm(): CategoryForm {
  return { name_it: '', name_en: '', sortOrder: 0 }
}

export function mapCategoryToForm(cat: PhotoCategoryWithCount): CategoryForm {
  return { name_it: cat.name_it, name_en: cat.name_en, sortOrder: cat.sortOrder }
}

export function toCategoryPayload(form: CategoryForm): PhotoCategoryInput {
  return { name_it: form.name_it.trim(), name_en: form.name_en.trim(), sortOrder: form.sortOrder }
}
