import { toast } from 'react-hot-toast'
import { getAdminPages, updatePageVisibility } from '@/api/admin/pages'
import { useAdminCrud } from '@/hooks/admin/useAdminCrud'
import {
  ADMIN_PAGE_LABELS,
  ADMIN_PAGE_VISIBILITY_SLUGS,
} from '@/lib/admin/pageVisibility'
import { patchPublicPagesCache } from '@/services/pagesStore'
import { extractErrorMessage } from '@/utils/errors'
import type { Page } from '@/types/api'

export function usePagesPage() {
  const crud = useAdminCrud<Page>({
    load: async () => {
      const pages = await getAdminPages()
      return pages.filter(page => ADMIN_PAGE_VISIBILITY_SLUGS.includes(page.slug as typeof ADMIN_PAGE_VISIBILITY_SLUGS[number]))
    },
    getSearchText: page => `${ADMIN_PAGE_LABELS[page.slug] ?? page.slug}`,
    pageSize: 10,
  })

  const toggleVisibility = async (page: Page) => {
    crud.setError('')

    try {
      const updated = await updatePageVisibility(page.slug, !page.isVisible)
      crud.upsert(updated)
      patchPublicPagesCache(updated)
      toast.success('Salvato')
    } catch (error) {
      const message = extractErrorMessage(error, 'Impossibile aggiornare la visibilita della pagina.')
      crud.setError(message)
      toast.error(message)
    }
  }

  return {
    ...crud,
    toggleVisibility,
  }
}
