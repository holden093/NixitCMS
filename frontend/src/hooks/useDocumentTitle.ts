import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title
    const nextTitle = title.trim() || previousTitle
    document.title = nextTitle

    return () => {
      document.title = previousTitle
    }
  }, [title])
}
