import type { PhotoCategory } from '@/types/api'

interface CategoryFilterProps {
  categories: PhotoCategory[]
  active: string | null
  locale: 'it' | 'en'
  onSelect: (slug: string | null) => void
}

export default function CategoryFilter({
  categories,
  active,
  locale,
  onSelect,
}: CategoryFilterProps) {
  if (!categories.length) {
    return null
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        aria-pressed={active === null}
        onClick={() => onSelect(null)}
        className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
          active === null
            ? 'bg-accent text-white'
            : 'border border-border bg-transparent text-muted hover:border-accent/60 hover:text-foreground'
        }`}
      >
        Tutte
      </button>

      {categories.map(category => {
        const label = locale === 'it' ? category.name_it : category.name_en
        const isActive = active === category.slug

        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(category.slug)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'bg-accent text-white'
                : 'border border-border bg-transparent text-muted hover:border-accent/60 hover:text-foreground'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
