import { useCallback, useEffect, useMemo, useState } from 'react'

type EntityKey = string | number

function getEntityKey<T>(item: T): EntityKey {
  if (item && typeof item === 'object') {
    const record = item as Record<string, unknown>
    const key = record.id ?? record.slug ?? record.pageSlug ?? record.key
    if (typeof key === 'string' || typeof key === 'number') {
      return key
    }
  }

  return JSON.stringify(item)
}

function paginateItems<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    page: safePage,
    totalPages,
    items: items.slice(start, start + pageSize),
  }
}

interface UseAdminCrudOptions<T> {
  load: () => Promise<T[]>
  getSearchText: (item: T) => string
  pageSize: number
  sort?: (items: T[]) => T[]
}

export function useAdminCrud<T>({
  load,
  getSearchText,
  pageSize,
  sort,
}: UseAdminCrudOptions<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQueryState] = useState('')
  const [page, setPage] = useState(1)

  const normalizeItems = useCallback(
    (nextItems: T[]) => (sort ? sort([...nextItems]) : nextItems),
    [sort],
  )

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const nextItems = await load()
      setItems(normalizeItems(nextItems))
      return nextItems
    } catch (err) {
      const nextError = err instanceof Error ? err.message : 'Errore durante il caricamento'
      setError(nextError)
      throw err
    } finally {
      setLoading(false)
    }
  }, [load, normalizeItems])

  useEffect(() => {
    void reload()
  }, [reload])

  const setQuery = (nextQuery: string) => {
    setQueryState(nextQuery)
    setPage(1)
  }

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return items
    }

    return items.filter(item => getSearchText(item).toLowerCase().includes(normalizedQuery))
  }, [getSearchText, items, query])

  const paginatedItems = useMemo(
    () => paginateItems(filteredItems, page, pageSize),
    [filteredItems, page, pageSize],
  )

  useEffect(() => {
    if (page !== paginatedItems.page) {
      setPage(paginatedItems.page)
    }
  }, [page, paginatedItems.page])

  const replaceAll = (nextItems: T[]) => {
    setItems(normalizeItems(nextItems))
  }

  const upsert = (nextItem: T) => {
    const nextKey = getEntityKey(nextItem)
    setItems(current => {
      const hasItem = current.some(item => getEntityKey(item) === nextKey)
      const merged = hasItem
        ? current.map(item => (getEntityKey(item) === nextKey ? nextItem : item))
        : [nextItem, ...current]

      return normalizeItems(merged)
    })
  }

  const remove = (matcher: EntityKey | ((item: T) => boolean)) => {
    setItems(current => current.filter(item => {
      if (typeof matcher === 'function') {
        return !matcher(item)
      }

      return getEntityKey(item) !== matcher
    }))
  }

  return {
    items,
    loading,
    error,
    setError,
    query,
    setQuery,
    page,
    setPage,
    filteredItems,
    paginatedItems,
    reload,
    upsert,
    remove,
    replaceAll,
  }
}
