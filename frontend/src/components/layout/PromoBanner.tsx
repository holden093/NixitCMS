import type { PublicShellModel } from '@/lib/public/shell'

interface PromoBannerProps {
  promo: PublicShellModel['promo']
}

function PromoBannerContent({ text }: { text: string }) {
  return (
    <div className="page-grid flex h-8 items-center justify-center">
      <span className="block truncate text-center text-[11px] font-medium leading-none md:text-[13px]">
        {text}
      </span>
    </div>
  )
}

export default function PromoBanner({ promo }: PromoBannerProps) {
  if (!promo.isVisible) {
    return null
  }

  if (promo.link) {
    return (
      <a
        href={promo.link}
        className="fixed inset-x-0 top-0 z-[60] block bg-accent text-paper transition-opacity hover:opacity-95"
      >
        <PromoBannerContent text={promo.text} />
      </a>
    )
  }

  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-accent text-paper">
      <PromoBannerContent text={promo.text} />
    </div>
  )
}
