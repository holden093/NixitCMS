import { buildAbsoluteMediaUrl, buildNewsArticleUrl, getLocalizedNewsValue, stripHtml } from '../lib/newsPayloads'
import type { PublicShellModel } from '../lib/publicShell'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface NewsArticleHtmlInput {
  article: {
    slug: string
    title_it: string
    title_en: string
    excerpt_it: string
    excerpt_en: string
    bodyHtml_it: string
    bodyHtml_en: string
    publishedAt: Date | null
    featuredMedia: { key: string } | null
  }
  locale: 'it' | 'en'
  shell: PublicShellModel
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function renderHeaderNavLink(link: PublicShellModel['header']['navItems'][number], active: boolean) {
  const activeClass = active ? ' is-active' : ''
  return `<a class="nav-link${activeClass}" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
}

function renderFooterNavLink(link: PublicShellModel['footer']['navItems'][number]) {
  return `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
}

function renderFlagIcon(locale: 'it' | 'en') {
  if (locale === 'it') {
    return `
      <svg viewBox="0 0 18 14" class="flag-icon" aria-hidden="true">
        <rect width="6" height="14" fill="#009246" />
        <rect x="6" width="6" height="14" fill="#F1F2F1" />
        <rect x="12" width="6" height="14" fill="#CE2B37" />
      </svg>
    `
  }

  return `
    <svg viewBox="0 0 18 14" class="flag-icon" aria-hidden="true">
      <rect width="18" height="14" fill="#012169" />
      <path d="M0 0l18 14M18 0L0 14" stroke="#FFFFFF" stroke-width="4" />
      <path d="M0 0l18 14M18 0L0 14" stroke="#C8102E" stroke-width="2" />
      <path d="M9 0v14M0 7h18" stroke="#FFFFFF" stroke-width="6" />
      <path d="M9 0v14M0 7h18" stroke="#C8102E" stroke-width="3" />
    </svg>
  `
}

function renderPhoneIcon() {
  return `
    <svg viewBox="0 0 24 24" class="action-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.65 2.64a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.44-1.22a2 2 0 0 1 2.11-.45c.85.31 1.74.53 2.64.65A2 2 0 0 1 22 16.92z"></path>
    </svg>
  `
}

function renderMapPinIcon() {
  return `
    <svg viewBox="0 0 24 24" class="footer-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z"></path>
      <circle cx="12" cy="11" r="2.5"></circle>
    </svg>
  `
}

function renderMailIcon() {
  return `
    <svg viewBox="0 0 24 24" class="footer-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <path d="M3 7l9 6 9-6"></path>
    </svg>
  `
}

function findShellLink(shell: PublicShellModel, slug: PublicShellModel['header']['navItems'][number]['id']) {
  return shell.header.navItems.find(link => link.id === slug)
}

function stripLeadingEmptyBlocks(bodyHtml: string) {
  let cleaned = bodyHtml.trim()
  const patterns = [
    /^<p[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>\s*/i,
    /^<div[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/div>\s*/i,
  ]

  let changed = true

  while (changed && cleaned) {
    changed = false

    for (const pattern of patterns) {
      const next = cleaned.replace(pattern, '').trimStart()
      if (next !== cleaned) {
        cleaned = next
        changed = true
      }
    }
  }

  return cleaned
}

function stripLeadingDuplicateFeaturedImage(bodyHtml: string, featuredMediaKey: string) {
  const normalizedBodyHtml = stripLeadingEmptyBlocks(bodyHtml)

  if (!normalizedBodyHtml || !featuredMediaKey) {
    return normalizedBodyHtml || bodyHtml.trim()
  }

  const escapedKey = escapeRegExp(featuredMediaKey)
  const patterns = [
    new RegExp(`^<figure[^>]*>\\s*<img\\b[^>]*src=(["'])[^"']*${escapedKey}[^"']*\\1[^>]*>[\\s\\S]*?</figure>`, 'i'),
    new RegExp(`^<p[^>]*>\\s*<img\\b[^>]*src=(["'])[^"']*${escapedKey}[^"']*\\1[^>]*>\\s*</p>`, 'i'),
    new RegExp(`^<img\\b[^>]*src=(["'])[^"']*${escapedKey}[^"']*\\1[^>]*>`, 'i'),
  ]

  for (const pattern of patterns) {
    if (!pattern.test(normalizedBodyHtml)) {
      continue
    }

    const stripped = stripLeadingEmptyBlocks(normalizedBodyHtml.replace(pattern, ''))
    return stripped || normalizedBodyHtml
  }

  return normalizedBodyHtml
}

export function renderNewsArticleHtml({ article, locale, shell }: NewsArticleHtmlInput) {
  const localized = getLocalizedNewsValue(article, locale)
  const title = localized.title.trim() || shell.site.hotelName
  const description = localized.excerpt.trim() || stripHtml(localized.bodyHtml).slice(0, 220)
  const canonicalUrl = buildNewsArticleUrl(article.slug, locale)
  const targetLocale = locale === 'en' ? 'it' : 'en'
  const targetLocaleHref = buildNewsArticleUrl(article.slug, targetLocale)
  const imageUrl = article.featuredMedia?.key ? buildAbsoluteMediaUrl(article.featuredMedia.key, 'hero') : ''
  const homeLink = findShellLink(shell, 'home')
  const aboutLink = findShellLink(shell, 'about')
  const archiveLink = findShellLink(shell, 'news')
  const contactLink = findShellLink(shell, 'contacts')
  const bookingHref = shell.header.showBookingAction
    ? `${shell.header.brandHref}#booking`
    : ''
  const ui = locale === 'en'
    ? {
        newsLabel: 'News',
        publishedLabel: 'Published',
        exploreLabel: 'Explore',
        backToArchive: 'Back to news archive',
        skipToContent: 'Skip to main content',
        switchLanguageLabel: targetLocale === 'en' ? 'Switch to English' : 'Switch to Italian',
      }
    : {
        newsLabel: 'News',
        publishedLabel: 'Pubblicato',
        exploreLabel: 'Esplora',
        backToArchive: 'Torna all\'archivio news',
        skipToContent: 'Vai al contenuto principale',
        switchLanguageLabel: targetLocale === 'en' ? 'Passa all\'inglese' : 'Passa all\'italiano',
      }
  const articleBodyHtml = stripLeadingDuplicateFeaturedImage(localized.bodyHtml, article.featuredMedia?.key ?? '')
  const promoOffset = shell.promo.isVisible ? 32 : 0
  const fixedOffsetMobile = shell.promo.isVisible ? 128 : 96
  const fixedOffsetDesktop = shell.promo.isVisible ? 144 : 112
  const asideTopOffset = fixedOffsetDesktop
  const publishedAt = article.publishedAt
    ? new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'it-IT', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'Europe/Rome',
      }).format(article.publishedAt)
    : ''

  return `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#14100E" />
    <title>${escapeHtml(title)} | ${escapeHtml(shell.site.hotelName)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    ${imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}" />` : ''}
    <meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        color-scheme: light;
        --ink: #14100E;
        --ink-soft: #3A342F;
        --muted: #6B6560;
        --line: #E4E2DC;
        --paper: #FAFAF7;
        --stone-50: #FAFAF7;
        --stone-100: #F3F2EC;
        --stone-200: #E9E7E0;
        --stone-300: #CFCCC3;
        --stone-700: #44403C;
        --accent: #8B7355;
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        min-height: 100vh;
        background: var(--paper);
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        font-size: 15px;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }
      a { color: inherit; text-decoration: none; }
      img { max-width: 100%; }
      main {
        padding-top: ${fixedOffsetMobile}px;
      }
      .page-grid {
        margin-inline: auto;
        max-width: 1200px;
        padding-inline: 24px;
      }
      .skip-link {
        position: absolute;
        left: 12px;
        top: 12px;
        z-index: 100;
        padding: 8px 16px;
        background: var(--paper);
        color: var(--ink);
        font-size: 13px;
        font-weight: 500;
        opacity: 0;
        pointer-events: none;
      }
      .skip-link:focus {
        opacity: 1;
        pointer-events: auto;
      }
      .promo-banner {
        position: fixed;
        inset-inline: 0;
        top: 0;
        z-index: 60;
        background: var(--accent);
        color: var(--paper);
      }
      .promo-banner-link {
        display: block;
      }
      .promo-banner-inner {
        display: flex;
        min-height: 32px;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .promo-banner-copy {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
        font-weight: 500;
        line-height: 1;
      }
      .site-header {
        position: fixed;
        inset-inline: 0;
        top: ${promoOffset}px;
        z-index: 50;
        border-bottom: 1px solid var(--line);
        background: var(--paper);
      }
      .site-header-inner {
        display: flex;
        gap: 24px;
        align-items: center;
        justify-content: space-between;
        min-height: 64px;
      }
      .brand {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 14px;
      }
      .brand-logo {
        display: block;
        height: 36px;
        width: auto;
        object-fit: contain;
      }
      .brand-monogram {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 22px;
        font-weight: 500;
        line-height: 1;
      }
      .brand-copy {
        min-width: 0;
      }
      .brand-title {
        margin: 0;
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 22px;
        font-weight: 500;
        line-height: 1;
      }
      .brand-tagline {
        margin: 4px 0 0;
        color: var(--muted);
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .nav-links {
        display: flex;
        align-items: center;
        gap: 32px;
        font-size: 13px;
        font-weight: 500;
      }
      .nav-link {
        color: var(--muted);
        transition: color 160ms ease;
      }
      .nav-link:hover,
      .nav-link.is-active,
      .mobile-menu-links a.is-active {
        color: var(--ink);
      }
      .header-actions {
        display: none;
        align-items: center;
        gap: 24px;
      }
      .header-phone-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--ink);
        font-size: 13px;
        font-weight: 500;
        transition: color 160ms ease;
      }
      .header-phone-link:hover {
        color: var(--accent);
      }
      .header-book-link {
        display: inline-flex;
        height: 36px;
        align-items: center;
        padding: 0 16px;
        background: var(--ink);
        color: var(--paper);
        font-size: 13px;
        font-weight: 500;
        transition: background-color 160ms ease;
      }
      .header-book-link:hover {
        background: var(--ink-soft);
      }
      .lang-toggle {
        display: inline-flex;
        min-width: 4.5rem;
        height: 36px;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: 1px solid var(--line);
        background: var(--paper);
        color: var(--ink);
        padding: 0 12px;
        font-size: 13px;
        font-weight: 500;
        transition: background-color 160ms ease, border-color 160ms ease;
      }
      .lang-toggle:hover {
        background: var(--stone-100);
      }
      .flag-icon {
        width: 18px;
        height: 14px;
        overflow: hidden;
        border-radius: 1px;
        flex-shrink: 0;
      }
      .action-icon,
      .footer-icon {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }
      .menu-toggle {
        display: none;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: 0;
        padding: 0;
        background: transparent;
        color: var(--ink);
        cursor: pointer;
        position: relative;
        z-index: 1;
      }
      .menu-toggle svg {
        width: 22px;
        height: 22px;
      }
      .menu-toggle .icon-close {
        display: none;
      }
      .mobile-menu {
        display: none;
        border-top: 1px solid var(--line);
        background: var(--paper);
      }
      .mobile-menu-inner {
        padding: 16px 0;
      }
      .mobile-menu-utility {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 16px;
      }
      .mobile-menu-links {
        display: flex;
        flex-direction: column;
      }
      .mobile-menu-links a {
        border-bottom: 1px solid var(--line);
        padding: 12px 0;
        color: var(--muted);
        font-size: 14px;
        font-weight: 500;
        transition: color 160ms ease;
      }
      .mobile-menu-links a:hover {
        color: var(--ink);
      }
      body.menu-open .menu-toggle .icon-menu {
        display: none;
      }
      body.menu-open .menu-toggle .icon-close {
        display: block;
      }
      body.menu-open .mobile-menu {
        display: block;
      }
      .lead-shell {
        padding: 36px 0 28px;
      }
      .lead-grid {
        display: grid;
        gap: 24px;
        align-items: end;
      }
      .lead-copy {
        max-width: 42rem;
      }
      .eyebrow {
        margin: 0 0 12px;
        color: var(--muted);
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      h1,
      .display-title {
        margin: 0;
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: clamp(3rem, 6vw, 4.6rem);
        line-height: 1.05;
        font-weight: 500;
        letter-spacing: -0.02em;
      }
      .excerpt {
        margin: 18px 0 0;
        max-width: 34rem;
        color: var(--ink-soft);
        font-size: 17px;
        line-height: 1.75;
      }
      .meta {
        margin: 22px 0 0;
        color: var(--muted);
        font-size: 13px;
        font-weight: 500;
      }
      .meta span {
        color: var(--ink-soft);
      }
      .lead-media {
        overflow: hidden;
        background: var(--stone-100);
        border: 1px solid var(--line);
        box-shadow: 0 26px 60px rgba(20, 16, 14, 0.08);
      }
      .lead-media img {
        display: block;
        width: 100%;
        aspect-ratio: 4 / 3;
        object-fit: cover;
      }
      .content-shell {
        border-top: 1px solid var(--line);
        padding: 28px 0 72px;
      }
      .content-grid {
        display: grid;
        gap: 28px;
        align-items: start;
      }
      .article-shell {
        max-width: 46rem;
      }
      article {
        color: var(--ink);
        font-size: 15px;
        line-height: 1.7;
      }
      article h2,
      article h3,
      article h4 {
        margin: 1.75rem 0 0.65rem;
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        font-weight: 600;
        letter-spacing: -0.01em;
        line-height: 1.3;
      }
      article h2 { font-size: 22px; }
      article h3,
      article h4 { font-size: 17px; }
      article > *:first-child { margin-top: 0; }
      article > *:last-child { margin-bottom: 0; }
      article p {
        margin: 0;
      }
      article p + p,
      article ul + p,
      article ol + p,
      article p + ul,
      article p + ol,
      article blockquote + p {
        margin-top: 1rem;
      }
      article ul,
      article ol {
        margin: 1rem 0;
        padding-left: 1.4rem;
      }
      article li + li {
        margin-top: 0.4rem;
      }
      article blockquote {
        margin: 1.4rem 0;
        padding-left: 1rem;
        border-left: 2px solid var(--line);
        color: var(--muted);
      }
      article img {
        display: block;
        width: 100%;
        height: auto;
        margin: 1.5rem 0;
        border-radius: 2px;
        object-fit: cover;
      }
      article a {
        border-bottom: 1px solid var(--stone-300);
        color: var(--ink);
        transition: border-color 160ms ease;
      }
      article a:hover {
        border-color: var(--ink);
      }
      article strong {
        color: var(--ink);
        font-weight: 600;
      }
      .article-aside {
        border: 1px solid var(--line);
        background: var(--stone-100);
        padding: 22px;
      }
      .aside-copy {
        margin: 0 0 18px;
        color: var(--ink-soft);
        font-size: 13px;
        line-height: 1.65;
      }
      .aside-links {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .aside-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 18px;
        border: 1px solid var(--stone-300);
        color: var(--ink);
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
      }
      .aside-link:hover {
        background: var(--paper);
        border-color: var(--ink);
      }
      .aside-link-primary {
        background: var(--ink);
        border-color: var(--ink);
        color: var(--paper);
      }
      .aside-link-primary:hover {
        background: var(--ink-soft);
        border-color: var(--ink-soft);
      }
      .aside-detail {
        margin-top: 22px;
        border-top: 1px solid var(--line);
        padding-top: 18px;
      }
      .aside-detail p {
        margin: 0;
      }
      .aside-detail p + p {
        margin-top: 8px;
      }
      .site-footer {
        margin-top: auto;
        background: var(--ink);
        color: var(--paper);
      }
      .site-footer-inner {
        padding: 48px 0 42px;
      }
      .site-footer-brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .site-footer-brand .brand-title {
        margin: 0;
        color: var(--paper);
      }
      .site-footer-grid {
        display: grid;
        gap: 28px;
      }
      .footer-description {
        margin: 0;
        max-width: 36rem;
        color: rgba(243, 242, 236, 0.72);
        font-size: 13px;
        line-height: 1.75;
      }
      .footer-label {
        margin: 0 0 12px;
        color: rgba(243, 242, 236, 0.56);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .footer-links {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .footer-links a,
      .footer-contact-link {
        color: rgba(243, 242, 236, 0.82);
        font-size: 13px;
        transition: color 160ms ease;
      }
      .footer-links a:hover,
      .footer-contact-link:hover {
        color: var(--paper);
      }
      .footer-contact-link {
        display: inline-flex;
        align-items: flex-start;
        gap: 10px;
      }
      .footer-company-data {
        display: grid;
        gap: 12px;
        color: rgba(243, 242, 236, 0.82);
        font-size: 13px;
        line-height: 1.7;
      }
      .footer-company-data p {
        margin: 0;
      }
      .footer-meta {
        margin-top: 48px;
        border-top: 1px solid rgba(243, 242, 236, 0.12);
        padding-top: 16px;
        color: rgba(243, 242, 236, 0.52);
        font-size: 11px;
      }
      @media (min-width: 768px) {
        main {
          padding-top: ${fixedOffsetDesktop}px;
        }
        .page-grid {
          padding-inline: 48px;
        }
        .promo-banner-copy {
          font-size: 13px;
        }
        .site-header-inner {
          min-height: 80px;
        }
        .header-actions {
          display: flex;
        }
        .site-footer-grid {
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr) minmax(0, 0.9fr) minmax(0, 1.1fr);
          align-items: start;
        }
      }
      @media (min-width: 960px) {
        .lead-shell {
          padding: 48px 0 34px;
        }
        .lead-grid {
          grid-template-columns: minmax(0, 0.78fr) minmax(26rem, 0.92fr);
          gap: 40px;
        }
        .content-grid {
          grid-template-columns: minmax(0, 1fr) 18.5rem;
          gap: 40px;
        }
        .article-aside {
          position: sticky;
          top: ${asideTopOffset}px;
        }
      }
      @media (max-width: 767px) {
        .nav-links {
          display: none;
        }
        .menu-toggle {
          display: inline-flex;
        }
      }
      @media (max-width: 640px) {
        .page-grid {
          padding-inline: 18px;
        }
        .site-header-inner {
          min-height: 72px;
        }
        .brand-copy {
          display: none;
        }
        .brand-tagline {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    ${shell.promo.isVisible
      ? (shell.promo.link
        ? `
    <a class="promo-banner promo-banner-link" href="${escapeHtml(shell.promo.link)}">
      <div class="page-grid promo-banner-inner">
        <span class="promo-banner-copy">${escapeHtml(shell.promo.text)}</span>
      </div>
    </a>`
        : `
    <div class="promo-banner">
      <div class="page-grid promo-banner-inner">
        <span class="promo-banner-copy">${escapeHtml(shell.promo.text)}</span>
      </div>
    </div>`)
      : ''}
    <a href="#main-content" class="skip-link">${ui.skipToContent}</a>
    <header class="site-header">
      <div class="page-grid site-header-inner">
        <a class="brand" href="${escapeHtml(shell.header.brandHref)}">
          ${shell.site.logoUrl
            ? `<img class="brand-logo" src="${escapeHtml(shell.site.logoUrl)}" alt="${escapeHtml(shell.site.logoAlt)}" />`
            : `<span class="brand-monogram">${escapeHtml(shell.site.monogram)}</span>`}
          <div class="brand-copy">
            <p class="brand-title">${escapeHtml(shell.site.hotelName)}</p>
            <p class="brand-tagline">${escapeHtml(shell.copy.navTagline)}</p>
          </div>
        </a>
        <nav class="nav-links" aria-label="${escapeHtml(shell.header.menuLabel)}">
          ${shell.header.navItems.map(link => renderHeaderNavLink(link, link.id === shell.header.activeNavItemId)).join('')}
        </nav>
        <div class="header-actions">
          ${shell.site.phone ? `
            <a class="header-phone-link" href="tel:${escapeHtml(shell.site.phone)}" aria-label="${escapeHtml(shell.site.phone)}">
              ${renderPhoneIcon()}
              <span>${escapeHtml(shell.site.phone)}</span>
            </a>
          ` : ''}
          ${bookingHref ? `
            <a class="header-book-link" href="${escapeHtml(bookingHref)}">${escapeHtml(shell.copy.navBook)}</a>
          ` : ''}
          <a
            class="lang-toggle"
            href="${escapeHtml(targetLocaleHref)}"
            data-locale-toggle
            data-locale="${escapeHtml(targetLocale)}"
            aria-label="${escapeHtml(ui.switchLanguageLabel)}"
          >
            ${renderFlagIcon(targetLocale)}
            <span>${targetLocale.toUpperCase()}</span>
          </a>
        </div>
        <button
          class="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="mobile-site-menu"
          aria-label="${escapeHtml(shell.header.menuLabel)}"
          data-menu-toggle
        >
          <svg class="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
            <path d="M3 6h18"></path>
            <path d="M3 12h18"></path>
            <path d="M3 18h18"></path>
          </svg>
          <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12"></path>
            <path d="M18 6l-12 12"></path>
          </svg>
        </button>
      </div>
      <div id="mobile-site-menu" class="mobile-menu">
        <div class="page-grid mobile-menu-inner">
          <div class="mobile-menu-utility">
            <a
              class="lang-toggle"
              href="${escapeHtml(targetLocaleHref)}"
              data-locale-toggle
              data-locale="${escapeHtml(targetLocale)}"
              aria-label="${escapeHtml(ui.switchLanguageLabel)}"
            >
              ${renderFlagIcon(targetLocale)}
              <span>${targetLocale.toUpperCase()}</span>
            </a>
          </div>
          <nav class="mobile-menu-links" aria-label="${escapeHtml(shell.header.menuLabel)}">
            ${shell.header.navItems.map(link => renderHeaderNavLink(link, link.id === shell.header.activeNavItemId)).join('')}
          </nav>
        </div>
      </div>
    </header>

    <main id="main-content" tabindex="-1">
      <section class="lead-shell">
        <div class="page-grid">
          <div class="lead-grid">
            <div class="lead-copy">
              <p class="eyebrow">${ui.newsLabel}</p>
              <h1 class="display-title">${escapeHtml(title)}</h1>
              ${description ? `<p class="excerpt">${escapeHtml(description)}</p>` : ''}
              ${publishedAt ? `<p class="meta">${ui.publishedLabel} <span>${escapeHtml(publishedAt)}</span></p>` : ''}
            </div>

            ${imageUrl ? `
              <figure class="lead-media">
                <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" />
              </figure>
            ` : ''}
          </div>
        </div>
      </section>

      <section class="content-shell">
        <div class="page-grid">
          <div class="content-grid">
            <div class="article-shell">
              <article>${articleBodyHtml}</article>
            </div>

            <aside class="article-aside">
              <p class="eyebrow">${ui.exploreLabel}</p>
              <p class="aside-copy">${escapeHtml(shell.footer.description)}</p>
              <div class="aside-links">
                ${archiveLink ? `<a class="aside-link aside-link-primary" href="${escapeHtml(archiveLink.href)}">${ui.backToArchive}</a>` : ''}
                ${homeLink ? `<a class="aside-link" href="${escapeHtml(homeLink.href)}">${escapeHtml(homeLink.label)}</a>` : ''}
                ${contactLink ? `<a class="aside-link" href="${escapeHtml(contactLink.href)}">${escapeHtml(contactLink.label)}</a>` : ''}
                ${aboutLink ? `<a class="aside-link" href="${escapeHtml(aboutLink.href)}">${escapeHtml(aboutLink.label)}</a>` : ''}
              </div>

              ${(shell.site.address || shell.site.email) ? `
                <div class="aside-detail">
                  ${shell.site.address ? `<p>${escapeHtml(shell.site.address)}</p>` : ''}
                  ${shell.site.email ? `<p><a href="mailto:${escapeHtml(shell.site.email)}">${escapeHtml(shell.site.email)}</a></p>` : ''}
                </div>
              ` : ''}
            </aside>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="page-grid site-footer-inner">
        <div class="site-footer-grid">
          <div>
            <div class="site-footer-brand">
              ${shell.site.logoUrl
                ? `<img class="brand-logo" src="${escapeHtml(shell.site.logoUrl)}" alt="${escapeHtml(shell.site.logoAlt)}" />`
                : `<span class="brand-monogram">${escapeHtml(shell.site.monogram)}</span>`}
              <div>
                <p class="brand-title">${escapeHtml(shell.site.hotelName)}</p>
              </div>
            </div>
            <p class="footer-description">${escapeHtml(shell.footer.description)}</p>
          </div>

          <div>
            <p class="footer-label">${escapeHtml(shell.footer.exploreLabel)}</p>
            <div class="footer-links">
              ${shell.footer.navItems.map(renderFooterNavLink).join('')}
            </div>
          </div>

          <div>
            <p class="footer-label">${escapeHtml(shell.footer.bookingLabel)}</p>
            <div class="footer-links">
              ${shell.footer.locationHref ? `
                <a class="footer-contact-link" href="${escapeHtml(shell.footer.locationHref)}">
                  ${renderMapPinIcon()}
                  <span>${escapeHtml(shell.footer.locationLabel)}</span>
                </a>
              ` : ''}
              ${shell.site.email ? `
                <a class="footer-contact-link" href="mailto:${escapeHtml(shell.site.email)}">
                  ${renderMailIcon()}
                  <span>${escapeHtml(shell.site.email)}</span>
                </a>
              ` : ''}
            </div>
          </div>

          <div>
            <p class="footer-label">${escapeHtml(shell.footer.companyDataLabel)}</p>
            <div class="footer-company-data">
              <div>
                <p class="footer-label">${escapeHtml(shell.footer.legalNameLabel)}</p>
                <p>${escapeHtml(shell.site.legalName || shell.site.hotelName)}</p>
              </div>
              ${shell.site.address ? `
                <div>
                  <p class="footer-label">${escapeHtml(shell.footer.addressLabel)}</p>
                  <p>${escapeHtml(shell.site.address)}</p>
                </div>
              ` : ''}
              ${shell.site.vatNumber ? `
                <div>
                  <p class="footer-label">${escapeHtml(shell.footer.vatNumberLabel)}</p>
                  <p>${escapeHtml(shell.site.vatNumber)}</p>
                </div>
              ` : ''}
              ${shell.site.taxCode ? `
                <div>
                  <p class="footer-label">${escapeHtml(shell.footer.taxCodeLabel)}</p>
                  <p>${escapeHtml(shell.site.taxCode)}</p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
        <div class="footer-meta">© ${new Date().getFullYear()} ${escapeHtml(shell.site.legalName || shell.site.hotelName)}</div>
      </div>
    </footer>
    <script>
      (function () {
        const toggle = document.querySelector('[data-menu-toggle]');
        const menu = document.getElementById('mobile-site-menu');
        if (!toggle || !menu) return;

        const setOpen = function (nextOpen) {
          document.body.classList.toggle('menu-open', nextOpen);
          toggle.setAttribute('aria-expanded', String(nextOpen));
        };

        toggle.addEventListener('click', function () {
          setOpen(!document.body.classList.contains('menu-open'));
        });

        menu.querySelectorAll('a').forEach(function (link) {
          link.addEventListener('click', function () {
            setOpen(false);
          });
        });

        document.querySelectorAll('[data-locale-toggle]').forEach(function (link) {
          link.addEventListener('click', function () {
            try {
              const nextLocale = link.getAttribute('data-locale');
              if (nextLocale) {
                window.localStorage.setItem('cms.locale', nextLocale);
              }
            } catch {}
          });
        });
      }());
    </script>
  </body>
</html>`
}
