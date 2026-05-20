import { getMediaUrl } from '@/api/media'
import SafeImage from '@/components/SafeImage'
import { getLocalizedMediaCategoryLabel } from '@/lib/media'
import type { LocaleCode, MediaFile } from '@/types/api'

const spans = [
  'md:col-span-2 md:row-span-2',
  'md:row-span-2',
  '',
  '',
  'md:col-span-2',
  '',
  'md:row-span-2',
  '',
]

export default function MasonryGallery({
  files,
  hotelName,
  locale,
}: {
  files: MediaFile[]
  hotelName: string
  locale: LocaleCode
}) {
  if (!files.length) return null

  return (
    <div className="grid auto-rows-[11rem] gap-4 md:grid-cols-4 md:auto-rows-[12rem] xl:auto-rows-[13rem]">
      {files.map((file, index) => {
        const presentationLabel = getLocalizedMediaCategoryLabel(file, locale) || hotelName || `Photo ${index + 1}`

        return (
          <figure
            key={file.id}
            className={`group relative overflow-hidden border border-line bg-stone-100 ${
              spans[index % spans.length]
            }`}
          >
            <SafeImage
              src={getMediaUrl(file.key, 'gallery')}
              alt={presentationLabel}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 100vw"
              className="h-full min-h-[18rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:min-h-0"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,15,13,0)_0%,rgba(20,15,13,0.18)_44%,rgba(20,15,13,0.6)_100%)]" />

            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <p className="eyebrow text-paper">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 text-h3 font-medium leading-tight text-paper">
                  {presentationLabel}
                </p>
              </div>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}
