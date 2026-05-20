import axios from 'axios'
import client from '../client'
import type { SiteTransferImportResult } from '@/types/api'

function extractFilename(headerValue: string | undefined) {
  if (!headerValue) {
    return null
  }

  const encodedMatch = headerValue.match(/filename\*=UTF-8''([^;]+)/i)
  if (encodedMatch?.[1]) {
    return decodeURIComponent(encodedMatch[1])
  }

  const plainMatch = headerValue.match(/filename="?([^"]+)"?/i)
  return plainMatch?.[1] ?? null
}

async function createReadableAxiosError(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data

    if (payload instanceof Blob) {
      try {
        const parsed = JSON.parse(await payload.text()) as { message?: unknown }
        if (typeof parsed.message === 'string' && parsed.message.trim()) {
          return new Error(parsed.message)
        }
      } catch {
        return new Error(fallback)
      }
    }

    const message = error.response?.data?.message
    if (typeof message === 'string' && message.trim()) {
      return new Error(message)
    }
  }

  if (error instanceof Error) {
    return error
  }

  return new Error(fallback)
}

export async function exportSitePackage() {
  try {
    const response = await client.post<Blob>('/admin/site-transfer/export', undefined, {
      responseType: 'blob',
    })

    return {
      blob: response.data,
      filename: extractFilename(response.headers['content-disposition']) ?? 'site-export.tar.gz',
    }
  } catch (error) {
    throw await createReadableAxiosError(error, 'Impossibile esportare il sito.')
  }
}

export function importSitePackage(file: File) {
  const formData = new FormData()
  formData.append('archive', file)

  return client
    .post<SiteTransferImportResult>('/admin/site-transfer/import', formData)
    .then(response => response.data)
}
