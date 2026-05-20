import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

import { getMediaUrl } from '@/api/media'
import SafeImage from '@/components/SafeImage'
import { getLocalizedMediaCategoryLabel } from '@/lib/media'
import type { LocaleCode, MediaFile } from '@/types/api'

interface PhotoSlideshowProps {
  photos: MediaFile[]
  locale: LocaleCode
}

interface SlideshowArrowButtonProps {
  ariaLabel: string
  direction: 'left' | 'right'
  positionClassName: string
  onClick: () => void
}

function getDisplayUrl(photo: MediaFile) {
  return getMediaUrl(photo.key, 'gallery')
}

function getThumbnailUrl(photo: MediaFile) {
  return getMediaUrl(photo.key, 'thumb')
}

function getAltText(photo: MediaFile, index: number, locale: LocaleCode) {
  return getLocalizedMediaCategoryLabel(photo, locale) || `Photo ${index + 1}`
}

function SlideshowArrowButton({
  ariaLabel,
  direction,
  positionClassName,
  onClick,
}: SlideshowArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors duration-200 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${positionClassName}`}
    >
      {direction === 'left' ? (
        <ChevronLeft size={20} strokeWidth={2.4} />
      ) : (
        <ChevronRight size={20} strokeWidth={2.4} />
      )}
    </button>
  )
}

export default function PhotoSlideshow({ photos, locale }: PhotoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const totalPhotos = photos.length
  const hasMultiplePhotos = totalPhotos > 1

  useEffect(() => {
    if (!totalPhotos) {
      return
    }

    setCurrentIndex(index => (index >= totalPhotos ? 0 : index))
  }, [totalPhotos])

  useEffect(() => {
    if (!hasMultiplePhotos) {
      return
    }

    const neighborIndexes = [
      (currentIndex - 1 + totalPhotos) % totalPhotos,
      (currentIndex + 1) % totalPhotos,
    ]

    neighborIndexes.forEach(index => {
      const image = new Image()
      image.src = getDisplayUrl(photos[index])
    })
  }, [currentIndex, hasMultiplePhotos, photos, totalPhotos])

  if (!totalPhotos) {
    return null
  }

  const currentPhoto = photos[currentIndex]
  const currentPhotoLabel = getAltText(currentPhoto, currentIndex, locale)
  const galleryHint = locale === 'en'
    ? 'Click the image to open the gallery.'
    : "Clicca sull'immagine per aprire la galleria."

  const setActivePhoto = (nextIndex: number, openLightbox = false) => {
    if (nextIndex < 0 || nextIndex >= totalPhotos) {
      return
    }

    setCurrentIndex(nextIndex)
    if (openLightbox) {
      setLightboxOpen(true)
    }
  }

  const goNext = () => {
    setCurrentIndex(index => (index + 1) % totalPhotos)
  }

  const goPrev = () => {
    setCurrentIndex(index => (index - 1 + totalPhotos) % totalPhotos)
  }

  const handleScopedKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (!hasMultiplePhotos) {
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  return (
    <div className="w-full" onKeyDown={handleScopedKeyDown}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2"
          aria-label={galleryHint}
        >
          <SafeImage
            key={currentPhoto.key}
            src={getDisplayUrl(currentPhoto)}
            alt={currentPhotoLabel}
            loading="eager"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="bg-ink/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-paper">
              {locale === 'en' ? 'Open gallery' : 'Apri galleria'}
            </span>
          </div>
          <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center bg-ink/80 text-paper">
            <Expand size={15} strokeWidth={1.75} />
          </span>
        </button>

        {hasMultiplePhotos ? (
          <>
            <SlideshowArrowButton
              ariaLabel="Previous photo"
              direction="left"
              positionClassName="left-4"
              onClick={goPrev}
            />
            <SlideshowArrowButton
              ariaLabel="Next photo"
              direction="right"
              positionClassName="right-4"
              onClick={goNext}
            />

            <div className="absolute bottom-4 right-4 bg-ink/80 px-2.5 py-1 text-[12px] text-paper">
              {currentIndex + 1} / {totalPhotos}
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p className="text-h3 font-semibold text-ink">{currentPhotoLabel}</p>
        <p className="eyebrow">{galleryHint}</p>
      </div>

      {hasMultiplePhotos ? (
        <div className="mt-4 overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {photos.map((photo, index) => {
              const isActive = index === currentIndex

              return (
                <button
                  key={photo.id}
                  type="button"
                  aria-label={`Open photo ${index + 1}`}
                  aria-pressed={isActive}
                  onClick={() => setActivePhoto(index, true)}
                  className={`overflow-hidden border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 ${
                    isActive ? 'border-ink opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    key={photo.key}
                    src={getThumbnailUrl(photo)}
                    alt={getAltText(photo, index, locale)}
                    loading="lazy"
                    decoding="async"
                    className="h-[60px] w-[84px] object-cover"
                  />
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[1600] bg-ink/95" />
          <Dialog.Content
            onOpenAutoFocus={event => event.preventDefault()}
            onCloseAutoFocus={event => event.preventDefault()}
            onKeyDown={handleScopedKeyDown}
            className="fixed left-1/2 top-1/2 z-[1610] flex max-h-[94vh] w-[min(96vw,86rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-stone-700 bg-ink outline-none"
          >
            <Dialog.Title className="sr-only">{currentPhotoLabel}</Dialog.Title>
            <Dialog.Description className="sr-only">{galleryHint}</Dialog.Description>

            <div className="flex items-start justify-between gap-4 border-b border-stone-700 px-5 py-4 text-paper md:px-7">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-stone-300/70">
                  {currentIndex + 1} / {totalPhotos}
                </p>
                <p className="mt-1.5 text-h3 font-semibold text-paper md:text-h2">{currentPhotoLabel}</p>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-700 text-paper transition-colors hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/75"
                  aria-label={locale === 'en' ? 'Close gallery' : 'Chiudi galleria'}
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </Dialog.Close>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 md:px-7 md:py-6">
              <SafeImage
                key={`${currentPhoto.key}-lightbox`}
                src={getDisplayUrl(currentPhoto)}
                alt={currentPhotoLabel}
                loading="eager"
                decoding="async"
                className="max-h-[68vh] w-full object-contain"
              />

              {hasMultiplePhotos ? (
                <>
                  <SlideshowArrowButton
                    ariaLabel="Previous photo"
                    direction="left"
                    positionClassName="left-6 md:left-9"
                    onClick={goPrev}
                  />
                  <SlideshowArrowButton
                    ariaLabel="Next photo"
                    direction="right"
                    positionClassName="right-6 md:right-9"
                    onClick={goNext}
                  />
                </>
              ) : null}
            </div>

            {hasMultiplePhotos ? (
              <div className="border-t border-stone-700 px-4 py-4 md:px-7">
                <div className="overflow-x-auto">
                  <div className="flex min-w-max gap-2">
                    {photos.map((photo, index) => {
                      const isActive = index === currentIndex

                      return (
                        <button
                          key={`${photo.id}-lightbox-thumb`}
                          type="button"
                          aria-label={`Show photo ${index + 1}`}
                          aria-pressed={isActive}
                          onClick={() => setActivePhoto(index)}
                          className={`overflow-hidden border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/70 ${
                            isActive ? 'border-paper opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <SafeImage
                            key={`${photo.key}-lightbox-thumb`}
                            src={getThumbnailUrl(photo)}
                            alt={getAltText(photo, index, locale)}
                            loading="lazy"
                            decoding="async"
                            className="h-[64px] w-[90px] object-cover"
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
