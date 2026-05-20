import nodemailer from 'nodemailer'
import { config } from '../config'

// Site palette (mirrors frontend CSS variables)
const C_INK = '#14100E'
const C_ACCENT = '#8B7355'
const C_PAPER = '#FAFAF7'
const C_STONE_100 = '#F3F2EC'
const C_STONE_200 = '#E9E7E0'
const C_MUTED = '#6B6560'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (!config.smtpHost) {
    throw new Error('SMTP not configured: set SMTP_HOST (and credentials) to enable the contact form.')
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      auth: config.smtpUser ? { user: config.smtpUser, pass: config.smtpPass } : undefined,
    })
  }

  return transporter
}

export interface ContactPayload {
  name: string
  surname: string
  email: string
  message: string
}

export interface SiteInfo {
  hotelName: string
  address: string
  city: string
  phone: string
  email: string
}

export interface NewsletterConfirmationPayload {
  recipientEmail: string
  confirmUrl: string
  unsubscribeUrl: string
  locale: 'it' | 'en'
}

export interface NewsTeaserEmailPayload {
  recipientEmail: string
  articleTitle: string
  articleExcerpt: string
  articleUrl: string
  unsubscribeUrl: string
  featuredImageUrl?: string | null
  locale: 'it' | 'en'
}

function resolveMailHeaderEyebrow(site: SiteInfo) {
  const city = site.city.trim()
  if (city) {
    return city
  }

  const address = site.address.trim()
  if (!address) {
    return ''
  }

  const parts = address
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)

  return parts[0] ?? ''
}

function baseTemplate(hotelName: string, content: string, eyebrow = ''): string {
  const headerEyebrow = eyebrow.trim()

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(hotelName)}</title>
</head>
<body style="margin:0;padding:0;background:${C_STONE_200};font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C_STONE_200};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:${C_INK};padding:40px 48px 36px;text-align:center;border-radius:8px 8px 0 0;">
              ${headerEyebrow ? `<p style="margin:0 0 10px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:${C_ACCENT};font-family:Arial,sans-serif;">${escapeHtml(headerEyebrow)}</p>` : ''}
              <h1 style="margin:0;font-size:26px;font-weight:400;color:${C_PAPER};letter-spacing:0.5px;">${escapeHtml(hotelName)}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:${C_PAPER};padding:48px;border-left:1px solid ${C_STONE_200};border-right:1px solid ${C_STONE_200};">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${C_STONE_100};padding:24px 48px;text-align:center;border:1px solid ${C_STONE_200};border-top:none;border-radius:0 0 8px 8px;">
              FOOTER_PLACEHOLDER
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function renderTemplate(hotelName: string, content: string, site: SiteInfo, footerExtraHtml = ''): string {
  const footerLines: string[] = []
  if (site.hotelName) {
    footerLines.push(`<p style="margin:0 0 4px;font-size:13px;color:${C_INK};font-family:Georgia,serif;">${escapeHtml(site.hotelName)}</p>`)
  }
  const addressParts = [site.address, site.city].filter(Boolean)
  if (addressParts.length) {
    footerLines.push(`<p style="margin:0 0 3px;font-size:12px;color:${C_MUTED};font-family:Arial,sans-serif;">${addressParts.map(escapeHtml).join(' &mdash; ')}</p>`)
  }
  if (site.phone) {
    footerLines.push(`<p style="margin:0 0 3px;font-size:12px;color:${C_MUTED};font-family:Arial,sans-serif;">${escapeHtml(site.phone)}</p>`)
  }
  if (site.email) {
    footerLines.push(`<p style="margin:0;font-size:12px;font-family:Arial,sans-serif;"><a href="mailto:${escapeHtml(site.email)}" style="color:${C_ACCENT};text-decoration:none;">${escapeHtml(site.email)}</a></p>`)
  }

  const footerContent = [footerLines.join('\n'), footerExtraHtml].filter(Boolean).join('\n')
  return baseTemplate(hotelName, content, resolveMailHeaderEyebrow(site)).replace('FOOTER_PLACEHOLDER', footerContent)
}

function notificationHtml(payload: ContactPayload, site: SiteInfo): string {
  const lines = escapeHtml(payload.message).replace(/\n/g, '<br>')
  const content = `
    <h2 style="margin:0 0 6px;font-size:22px;font-weight:400;color:${C_INK};">Nuovo messaggio dal sito</h2>
    <p style="margin:0 0 36px;font-size:13px;color:${C_MUTED};font-family:Arial,sans-serif;letter-spacing:0.3px;">Ricevuto tramite il modulo di contatto</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      <tr>
        <td style="padding:14px 18px;background:${C_STONE_100};border-left:3px solid ${C_ACCENT};">
          <p style="margin:0 0 3px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C_MUTED};font-family:Arial,sans-serif;">Nome</p>
          <p style="margin:0;font-size:16px;color:${C_INK};">${escapeHtml(payload.name)} ${escapeHtml(payload.surname)}</p>
        </td>
      </tr>
      <tr><td style="height:8px;"></td></tr>
      <tr>
        <td style="padding:14px 18px;background:${C_STONE_100};border-left:3px solid ${C_ACCENT};">
          <p style="margin:0 0 3px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C_MUTED};font-family:Arial,sans-serif;">Email</p>
          <p style="margin:0;font-size:16px;color:${C_INK};"><a href="mailto:${escapeHtml(payload.email)}" style="color:${C_ACCENT};text-decoration:none;">${escapeHtml(payload.email)}</a></p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 10px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C_MUTED};font-family:Arial,sans-serif;">Messaggio</p>
    <div style="padding:20px 24px;background:${C_STONE_100};border-left:3px solid ${C_STONE_200};font-size:15px;line-height:1.75;color:${C_INK};">
      ${lines}
    </div>

    <p style="margin:36px 0 0;text-align:center;">
      <a href="mailto:${escapeHtml(payload.email)}?subject=Re: messaggio dal sito"
         style="display:inline-block;padding:13px 30px;background:${C_INK};color:${C_PAPER};text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:2px;">
        Rispondi a ${escapeHtml(payload.name)}
      </a>
    </p>
  `
  return renderTemplate(site.hotelName, content, site)
}

function confirmationHtml(payload: ContactPayload, site: SiteInfo): string {
  const lines = escapeHtml(payload.message).replace(/\n/g, '<br>')
  const content = `
    <p style="margin:0 0 24px;font-size:16px;color:${C_INK};line-height:1.6;">
      Gentile <strong>${escapeHtml(payload.name)} ${escapeHtml(payload.surname)}</strong>,
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${C_INK};line-height:1.75;">
      abbiamo ricevuto il tuo messaggio e ti risponderemo nel più breve tempo possibile.
    </p>
    <p style="margin:0 0 40px;font-size:15px;color:${C_INK};line-height:1.75;">
      Grazie per averci contattato.
    </p>

    <p style="margin:0 0 10px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${C_MUTED};font-family:Arial,sans-serif;">Il tuo messaggio</p>
    <div style="padding:20px 24px;background:${C_STONE_100};border-left:3px solid ${C_STONE_200};font-size:14px;line-height:1.75;color:${C_MUTED};">
      ${lines}
    </div>

    <p style="margin:40px 0 0;font-size:14px;color:${C_MUTED};line-height:1.8;font-family:Arial,sans-serif;">
      A presto,<br>
      <span style="font-family:Georgia,serif;font-size:16px;color:${C_INK};">${escapeHtml(site.hotelName)}</span>
    </p>
  `
  return renderTemplate(site.hotelName, content, site)
}

export async function sendContact(payload: ContactPayload, site: SiteInfo) {
  const t = getTransporter()

  await Promise.all([
    t.sendMail({
      from: config.smtpFrom,
      to: config.contactEmailTo,
      replyTo: payload.email,
      subject: `Nuovo messaggio da ${payload.name} ${payload.surname} — ${site.hotelName}`,
      text: `Nome: ${payload.name} ${payload.surname}\nEmail: ${payload.email}\n\n${payload.message}`,
      html: notificationHtml(payload, site),
    }),
    t.sendMail({
      from: config.smtpFrom,
      to: payload.email,
      subject: `Abbiamo ricevuto il tuo messaggio — ${site.hotelName}`,
      text: `Gentile ${payload.name} ${payload.surname},\n\nabbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.\n\n---\n${payload.message}\n\n---\n${site.hotelName}`,
      html: confirmationHtml(payload, site),
    }),
  ])
}

function unsubscribeFooter(unsubscribeUrl: string, locale: 'it' | 'en') {
  const label = locale === 'en'
    ? 'If you no longer wish to receive these emails, unsubscribe here.'
    : 'Se non desideri piu ricevere queste email, disiscriviti qui.'

  return `
    <div style="margin-top:18px;padding-top:18px;border-top:1px solid ${C_STONE_200};">
      <p style="margin:0;font-size:12px;line-height:1.6;color:${C_MUTED};font-family:Arial,sans-serif;">
        <a href="${escapeHtml(unsubscribeUrl)}" style="color:${C_ACCENT};text-decoration:none;">${escapeHtml(label)}</a>
      </p>
    </div>
  `
}

export async function sendNewsletterConfirmation(
  payload: NewsletterConfirmationPayload,
  site: SiteInfo,
) {
  const t = getTransporter()
  const isEnglish = payload.locale === 'en'
  const body = isEnglish
    ? `
      <h2 style="margin:0 0 10px;font-size:22px;font-weight:400;color:${C_INK};">Confirm your subscription</h2>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${C_INK};">
        We received a request to subscribe <strong>${escapeHtml(payload.recipientEmail)}</strong> to the newsletter of ${escapeHtml(site.hotelName)}.
      </p>
      <p style="margin:0 0 28px;font-size:15px;line-height:1.75;color:${C_INK};">
        Please confirm your subscription to activate updates and future news releases.
      </p>
      <p style="margin:0;text-align:center;">
        <a href="${escapeHtml(payload.confirmUrl)}" style="display:inline-block;padding:13px 30px;background:${C_INK};color:${C_PAPER};text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:2px;">
          Confirm subscription
        </a>
      </p>
    `
    : `
      <h2 style="margin:0 0 10px;font-size:22px;font-weight:400;color:${C_INK};">Conferma la tua iscrizione</h2>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${C_INK};">
        Abbiamo ricevuto una richiesta di iscrizione alla newsletter di ${escapeHtml(site.hotelName)} per <strong>${escapeHtml(payload.recipientEmail)}</strong>.
      </p>
      <p style="margin:0 0 28px;font-size:15px;line-height:1.75;color:${C_INK};">
        Conferma l'iscrizione per attivare gli aggiornamenti e ricevere le prossime news.
      </p>
      <p style="margin:0;text-align:center;">
        <a href="${escapeHtml(payload.confirmUrl)}" style="display:inline-block;padding:13px 30px;background:${C_INK};color:${C_PAPER};text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:2px;">
          Conferma iscrizione
        </a>
      </p>
    `

  await t.sendMail({
    from: config.smtpFrom,
    to: payload.recipientEmail,
    subject: isEnglish
      ? `Confirm your subscription — ${site.hotelName}`
      : `Conferma iscrizione newsletter — ${site.hotelName}`,
    text: isEnglish
      ? `Confirm your subscription: ${payload.confirmUrl}\nUnsubscribe: ${payload.unsubscribeUrl}`
      : `Conferma la tua iscrizione: ${payload.confirmUrl}\nDisiscrizione: ${payload.unsubscribeUrl}`,
    html: renderTemplate(
      site.hotelName,
      body,
      site,
      unsubscribeFooter(payload.unsubscribeUrl, payload.locale),
    ),
  })
}

export async function sendNewsTeaserEmail(
  payload: NewsTeaserEmailPayload,
  site: SiteInfo,
) {
  const t = getTransporter()
  const isEnglish = payload.locale === 'en'
  const buttonLabel = isEnglish ? 'Read the full article' : 'Leggi l\'articolo completo'
  const intro = isEnglish
    ? 'A new update is available on the website.'
    : 'E disponibile una nuova news pubblicata sul sito.'
  const imageBlock = payload.featuredImageUrl
    ? `
      <div style="margin:0 0 24px;">
        <img src="${escapeHtml(payload.featuredImageUrl)}" alt="${escapeHtml(payload.articleTitle)}" style="display:block;width:100%;height:auto;border-radius:6px;" />
      </div>
    `
    : ''

  const body = `
    ${imageBlock}
    <p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C_MUTED};font-family:Arial,sans-serif;">${escapeHtml(intro)}</p>
    <h2 style="margin:0 0 14px;font-size:24px;font-weight:400;color:${C_INK};">${escapeHtml(payload.articleTitle)}</h2>
    <p style="margin:0 0 26px;font-size:15px;line-height:1.75;color:${C_INK};">${escapeHtml(payload.articleExcerpt)}</p>
    <p style="margin:0;text-align:center;">
      <a href="${escapeHtml(payload.articleUrl)}" style="display:inline-block;padding:13px 30px;background:${C_INK};color:${C_PAPER};text-decoration:none;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;border-radius:2px;">
        ${escapeHtml(buttonLabel)}
      </a>
    </p>
  `

  await t.sendMail({
    from: config.smtpFrom,
    to: payload.recipientEmail,
    subject: `${payload.articleTitle} — ${site.hotelName}`,
    text: `${payload.articleTitle}\n\n${payload.articleExcerpt}\n\n${payload.articleUrl}\n\n${payload.unsubscribeUrl}`,
    html: renderTemplate(
      site.hotelName,
      body,
      site,
      unsubscribeFooter(payload.unsubscribeUrl, payload.locale),
    ),
  })
}
