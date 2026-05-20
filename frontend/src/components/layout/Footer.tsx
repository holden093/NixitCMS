import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { usePublicShellModel } from '@/hooks/usePublicShellModel'

export default function Footer() {
  const shell = usePublicShellModel()

  const labelClass = 'text-[11px] font-medium uppercase tracking-[0.08em] text-stone-300/60'
  const linkClass = 'text-[13px] text-stone-300/80 transition-colors hover:text-paper'

  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="page-grid py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {shell.site.logoUrl ? (
                <img src={shell.site.logoUrl} alt={shell.site.logoAlt} className="h-9 w-auto object-contain" />
              ) : (
                <span className="font-serif text-[22px] font-medium leading-none text-paper">
                  {shell.site.monogram}
                </span>
              )}
              <p className="font-serif text-[22px] font-medium leading-none text-paper">
                {shell.site.hotelName}
              </p>
            </div>
            {shell.footer.description ? (
              <p className="max-w-md text-[13px] leading-6 text-stone-300/70">
                {shell.footer.description}
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            <p className={labelClass}>{shell.footer.exploreLabel}</p>
            <div className="flex flex-col gap-2">
              {shell.footer.navItems.map(link => (
                <Link key={link.id} to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className={labelClass}>{shell.footer.bookingLabel}</p>
            <div className="flex flex-col gap-2">
              {shell.footer.locationHref ? (
                <a
                  href={shell.footer.locationHref}
                  className={`${linkClass} inline-flex items-start gap-2`}
                >
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  <span>{shell.footer.locationLabel}</span>
                </a>
              ) : null}
              {shell.site.email ? (
                <a href={`mailto:${shell.site.email}`} className={`${linkClass} inline-flex items-start gap-2`}>
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  <span className="break-all">{shell.site.email}</span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="space-y-3">
            <p className={labelClass}>{shell.footer.companyDataLabel}</p>
            <div className="space-y-3 text-[13px] leading-6 text-stone-300/80">
              <div>
                <p className={labelClass}>{shell.footer.legalNameLabel}</p>
                <p>{shell.site.legalName || shell.site.hotelName}</p>
              </div>
              {shell.site.address ? (
                <div>
                  <p className={labelClass}>{shell.footer.addressLabel}</p>
                  <p>{shell.site.address}</p>
                </div>
              ) : null}
              {shell.site.vatNumber ? (
                <div>
                  <p className={labelClass}>{shell.footer.vatNumberLabel}</p>
                  <p>{shell.site.vatNumber}</p>
                </div>
              ) : null}
              {shell.site.taxCode ? (
                <div>
                  <p className={labelClass}>{shell.footer.taxCodeLabel}</p>
                  <p>{shell.site.taxCode}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-700 pt-5 text-[11px] text-stone-300/50">
          © {new Date().getFullYear()} {shell.site.legalName || shell.site.hotelName}
        </div>
      </div>
    </footer>
  )
}
