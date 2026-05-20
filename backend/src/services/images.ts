import sharp from 'sharp'

const SUPPORTED_IMAGE_MIME_TYPES = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
} as const

export const MEDIA_VARIANT_PRESETS = {
  thumb: { width: 480, height: 480, quality: 78 },
  logo: { width: 360, height: 180, quality: 84 },
  card: { width: 960, height: 720, quality: 80 },
  content: { width: 1280, height: 960, quality: 82 },
  hero: { width: 1920, height: 1280, quality: 84 },
  gallery: { width: 1600, height: 1200, quality: 82 },
} as const

const MASTER_LONG_EDGE = 2560

export type MediaVariantPreset = keyof typeof MEDIA_VARIANT_PRESETS

export interface GeneratedImageAssetSet {
  masterBuffer: Buffer
  thumbnailBuffer: Buffer
  variantBuffers: Record<MediaVariantPreset, Buffer>
}

export async function detectImageMimeType(buffer: Buffer): Promise<string | null> {
  try {
    const metadata = await sharp(buffer).metadata()
    if (!metadata.format) {
      return null
    }
    return SUPPORTED_IMAGE_MIME_TYPES[metadata.format as keyof typeof SUPPORTED_IMAGE_MIME_TYPES] ?? null
  } catch {
    return null
  }
}

export function isMediaVariantPreset(value: string): value is MediaVariantPreset {
  return value in MEDIA_VARIANT_PRESETS
}

function createImagePipeline(buffer: Buffer) {
  return sharp(buffer).rotate()
}

async function createOptimizedMaster(buffer: Buffer, mimeType: string) {
  if (mimeType === 'image/gif') {
    return buffer
  }

  const pipeline = createImagePipeline(buffer).resize({
    width: MASTER_LONG_EDGE,
    height: MASTER_LONG_EDGE,
    fit: 'inside',
    withoutEnlargement: true,
  })

  if (mimeType === 'image/jpeg') {
    return pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
  }

  if (mimeType === 'image/png') {
    return pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
  }

  if (mimeType === 'image/webp') {
    return pipeline.webp({ quality: 82 }).toBuffer()
  }

  if (mimeType === 'image/avif') {
    return pipeline.avif({ quality: 56, effort: 4 }).toBuffer()
  }

  return buffer
}

export async function createImageVariant(buffer: Buffer, preset: MediaVariantPreset) {
  const config = MEDIA_VARIANT_PRESETS[preset]

  return createImagePipeline(buffer)
    .resize({
      width: config.width,
      height: config.height,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: config.quality })
    .toBuffer()
}

export async function createImageThumbnail(buffer: Buffer) {
  return createImageVariant(buffer, 'thumb')
}

export async function createOptimizedImageAssetSet(buffer: Buffer, mimeType: string): Promise<GeneratedImageAssetSet> {
  const masterBuffer = await createOptimizedMaster(buffer, mimeType)
  const variantSourceBuffer = mimeType === 'image/gif' ? buffer : masterBuffer

  const variantEntries = await Promise.all(
    (Object.keys(MEDIA_VARIANT_PRESETS) as MediaVariantPreset[]).map(async preset => {
      const variantBuffer = await createImageVariant(variantSourceBuffer, preset)
      return [preset, variantBuffer] as const
    }),
  )

  const variantBuffers = Object.fromEntries(variantEntries) as Record<MediaVariantPreset, Buffer>

  return {
    masterBuffer,
    thumbnailBuffer: variantBuffers.thumb,
    variantBuffers,
  }
}
