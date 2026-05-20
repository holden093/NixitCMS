const photoCategoryBaseSelect = {
  id: true,
  slug: true,
  name_it: true,
  name_en: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
} as const

const mediaFileInclude = {
  categories: {
    include: {
      photoCategory: true,
    },
  },
} as const

export const serviceSummaryInclude = {
  previewMedia: {
    include: mediaFileInclude,
  },
  photoCategory: {
    select: {
      ...photoCategoryBaseSelect,
      _count: {
        select: {
          media: true,
        },
      },
      media: {
        take: 1,
        orderBy: {
          mediaFileId: 'asc',
        },
        include: {
          mediaFile: {
            include: mediaFileInclude,
          },
        },
      },
    },
  },
} as const

export const serviceDetailInclude = {
  previewMedia: {
    include: mediaFileInclude,
  },
  photoCategory: {
    include: {
      media: {
        orderBy: {
          mediaFileId: 'asc',
        },
        include: {
          mediaFile: {
            include: mediaFileInclude,
          },
        },
      },
    },
  },
} as const

type PhotoCategoryBase = {
  id: number
  slug: string
  name_it: string
  name_en: string
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

type SerializableMediaFile = {
  id: number
  key: string
  thumbnailKey: string | null
  filename: string
  mimeType: string
  size: number
  isPublic: boolean
  uploadedAt: Date
  categories?: Array<{ photoCategory: PhotoCategoryBase }>
}

type ServiceBaseRecord = {
  id: number
  slug: string
  name_it: string
  name_en: string
  description_it: string
  description_en: string
  isPublic: boolean
  sortOrder: number
  photoCategoryId: number | null
  previewMediaId: number | null
  createdAt: Date
  updatedAt: Date
}

type ServiceSummaryRecord = ServiceBaseRecord & {
  previewMedia: SerializableMediaFile | null
  photoCategory: (PhotoCategoryBase & {
    _count: { media: number }
    media: Array<{ mediaFile: SerializableMediaFile }>
  }) | null
}

type ServiceDetailRecord = ServiceBaseRecord & {
  previewMedia: SerializableMediaFile | null
  photoCategory: (PhotoCategoryBase & {
    media: Array<{ mediaFile: SerializableMediaFile }>
  }) | null
}

function serializeMediaFile<T extends SerializableMediaFile>(file: T) {
  const { filename, ...rest } = file
  return {
    ...rest,
    label: filename,
  }
}

function serializePhotoCategory<T extends PhotoCategoryBase>(photoCategory: T) {
  return {
    id: photoCategory.id,
    slug: photoCategory.slug,
    name_it: photoCategory.name_it,
    name_en: photoCategory.name_en,
    sortOrder: photoCategory.sortOrder,
    createdAt: photoCategory.createdAt,
    updatedAt: photoCategory.updatedAt,
  }
}

export function serializeServiceSummary(service: ServiceSummaryRecord) {
  const { photoCategory, previewMedia, ...rest } = service
  const fallbackPreview = photoCategory?.media[0]
    ? serializeMediaFile(photoCategory.media[0].mediaFile)
    : null
  const galleryPreview = previewMedia
    ? serializeMediaFile(previewMedia)
    : fallbackPreview

  return {
    ...rest,
    photoCategory: photoCategory ? serializePhotoCategory(photoCategory) : null,
    galleryPreview,
    galleryCount: photoCategory?._count.media ?? 0,
  }
}

export function serializeServiceDetail(service: ServiceDetailRecord) {
  const { photoCategory, previewMedia, ...rest } = service
  const media = photoCategory
    ? photoCategory.media.map(entry => serializeMediaFile(entry.mediaFile))
    : []
  const galleryPreview = previewMedia
    ? serializeMediaFile(previewMedia)
    : (media[0] ?? null)

  return {
    ...rest,
    photoCategory: photoCategory
      ? {
          ...serializePhotoCategory(photoCategory),
          media,
        }
      : null,
    galleryPreview,
    galleryCount: media.length,
  }
}
