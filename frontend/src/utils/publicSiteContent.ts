import type {
  AboutSectionContent,
  ContactsSectionContent,
  HomeSectionContent,
  NotFoundSectionContent,
  SiteChromeContent,
  ServiceTemplateContent,
} from '@/types/api'
import {
  parseStructuredSections,
  resolveStructuredSections,
  updateStructuredSectionValue,
  type SectionFieldDefinition,
} from '@/lib/content/structuredSections'
export {
  parseStructuredSections,
  resolveStructuredSections,
  updateStructuredSectionValue,
}
export type { SectionFieldDefinition } from '@/lib/content/structuredSections'

type Translator = (key: string) => string

export const PUBLIC_SITE_SLUGS = [
  'home',
  'about',
  'rooms',
  'contacts',
  'site',
  'service-template',
  'not-found',
] as const

export const PAGE_VISIBILITY_SLUGS = ['home', 'about', 'rooms', 'contacts'] as const

export const HOME_SECTION_FIELDS = [
  { key: 'eyebrow', label: 'Hero - Sopratitolo' },
  { key: 'primaryCta', label: 'Hero - CTA primaria' },
  { key: 'secondaryCta', label: 'Hero - CTA secondaria' },
  { key: 'bookingLabel', label: 'Prenotazione - Etichetta sezione' },
  { key: 'bookingIntro', label: 'Prenotazione - Testo introduttivo', multiline: true, rows: 3 },
  { key: 'roomsLabel', label: 'Camere - Etichetta sezione' },
  { key: 'roomsTitle', label: 'Camere - Titolo sezione' },
  { key: 'roomsIntro', label: 'Camere - Testo introduttivo', multiline: true, rows: 3 },
  { key: 'roomsCta', label: 'Camere - Testo pulsante' },
  { key: 'servicesLabel', label: 'Servizi - Etichetta sezione' },
  { key: 'servicesTitle', label: 'Servizi - Titolo sezione' },
  { key: 'servicesIntro', label: 'Servizi - Testo introduttivo', multiline: true, rows: 3 },
  { key: 'mapLabel', label: 'Mappa - Etichetta sezione' },
  { key: 'mapTitle', label: 'Mappa - Titolo sezione' },
  { key: 'mapIntro', label: 'Mappa - Testo introduttivo', multiline: true, rows: 3 },
  { key: 'mapCta', label: 'Mappa - Testo pulsante' },
  { key: 'tourismCta', label: 'Mappa - CTA guida turistica' },
  { key: 'tourismLabel', label: 'Guida turistica - Etichetta sezione' },
  { key: 'tourismTitle', label: 'Guida turistica - Titolo sezione' },
  { key: 'tourismIntro', label: 'Guida turistica - Testo introduttivo', multiline: true, rows: 3 },
] satisfies readonly SectionFieldDefinition<keyof HomeSectionContent>[]

export const SITE_CHROME_FIELDS = [
  { key: 'navHome', label: 'Navbar - Home' },
  { key: 'navAbout', label: 'Navbar - Chi siamo' },
  { key: 'navRooms', label: 'Navbar - Camere' },
  { key: 'navContacts', label: 'Navbar - Contatti' },
  { key: 'navBook', label: 'Navbar - Prenota' },
  { key: 'navTagline', label: 'Navbar - Tagline' },
  { key: 'footerDescription', label: 'Footer - Descrizione', multiline: true, rows: 3 },
  { key: 'footerExplore', label: 'Footer - Titolo Esplora' },
  { key: 'footerBooking', label: 'Footer - Titolo Soggiorno' },
  { key: 'footerCompanyData', label: 'Footer - Titolo Dati aziendali' },
  { key: 'footerLegalName', label: 'Footer - Ragione sociale' },
  { key: 'footerAddress', label: 'Footer - Indirizzo' },
  { key: 'footerVatNumber', label: 'Footer - Partita IVA' },
  { key: 'footerTaxCode', label: 'Footer - Codice fiscale' },
  { key: 'footerPhone', label: 'Footer - Telefono' },
  { key: 'footerEmail', label: 'Footer - Email' },
  { key: 'footerLocationLink', label: 'Footer - Link Mappa' },
] satisfies readonly SectionFieldDefinition<keyof SiteChromeContent>[]

export const ABOUT_SECTION_FIELDS = [
  { key: 'label', label: 'Pagina - Etichetta sezione' },
  { key: 'imageKey', label: 'Pagina - Immagine principale', type: 'media' },
  { key: 'quoteLabel', label: 'Pagina - Etichetta testo introduttivo' },
  { key: 'quoteBody', label: 'Pagina - Testo introduttivo in evidenza', multiline: true, rows: 3 },
] satisfies readonly SectionFieldDefinition<keyof AboutSectionContent>[]

export const CONTACTS_SECTION_FIELDS = [
  { key: 'privacyNote', label: 'Form - Nota privacy', multiline: true, rows: 3 },
  { key: 'nameLabel', label: 'Form - Nome' },
  { key: 'surnameLabel', label: 'Form - Cognome' },
  { key: 'emailLabel', label: 'Form - Email' },
  { key: 'messageLabel', label: 'Form - Messaggio' },
  { key: 'sendLabel', label: 'Form - Pulsante invio' },
  { key: 'successMessage', label: 'Form - Successo', multiline: true, rows: 2 },
  { key: 'errorMessage', label: 'Form - Errore', multiline: true, rows: 2 },
  { key: 'invalidEmail', label: 'Form - Email non valida' },
] satisfies readonly SectionFieldDefinition<keyof ContactsSectionContent>[]

export const SERVICE_TEMPLATE_FIELDS = [
  { key: 'readMore', label: "Card servizio - Leggi di piu'" },
] satisfies readonly SectionFieldDefinition<keyof ServiceTemplateContent>[]

export const NOT_FOUND_SECTION_FIELDS = [
  { key: 'label', label: '404 - Etichetta' },
  { key: 'home', label: '404 - CTA home' },
  { key: 'contacts', label: '404 - CTA contatti' },
] satisfies readonly SectionFieldDefinition<keyof NotFoundSectionContent>[]

export function getDefaultHomeSections(t: Translator): HomeSectionContent {
  return {
    eyebrow: t('home.eyebrow'),
    primaryCta: t('home.primaryCta'),
    secondaryCta: t('home.secondaryCta'),
    bookingLabel: t('home.booking'),
    bookingIntro: t('home.bookingIntro'),
    roomsLabel: t('home.roomsLabel'),
    roomsTitle: t('home.roomsTitle'),
    roomsIntro: t('home.roomsIntro'),
    roomsCta: t('home.roomsCta'),
    servicesLabel: t('home.services'),
    servicesTitle: t('home.services'),
    servicesIntro: t('home.servicesIntro'),
    mapLabel: t('home.map'),
    mapTitle: t('home.map'),
    mapIntro: t('home.mapIntro'),
    mapCta: t('home.mapCta'),
    tourismCta: t('home.tourismCta'),
    tourismLabel: t('home.tourismLabel'),
    tourismTitle: t('home.tourismTitle'),
    tourismIntro: t('home.tourismIntro'),
  }
}

export function getDefaultSiteChromeContent(t: Translator): SiteChromeContent {
  return {
    navHome: t('nav.home'),
    navAbout: t('nav.about'),
    navRooms: t('nav.rooms'),
    navContacts: t('nav.contacts'),
    navBook: t('nav.book'),
    navTagline: t('nav.tagline'),
    footerDescription: t('footer.description'),
    footerExplore: t('footer.explore'),
    footerBooking: t('footer.booking'),
    footerCompanyData: t('footer.companyData'),
    footerLegalName: t('footer.legalName'),
    footerAddress: t('footer.address'),
    footerVatNumber: t('footer.vatNumber'),
    footerTaxCode: t('footer.taxCode'),
    footerPhone: t('footer.phone'),
    footerEmail: t('footer.email'),
    footerLocationLink: t('home.map'),
  }
}

export function getDefaultAboutSections(t: Translator): AboutSectionContent {
  return {
    label: t('about.label'),
    imageKey: '',
    quoteLabel: t('about.quoteLabel'),
    quoteBody: t('about.quoteBody'),
  }
}

export function getDefaultContactsSections(t: Translator): ContactsSectionContent {
  return {
    privacyNote: t('contacts.privacyNote'),
    nameLabel: t('contacts.name'),
    surnameLabel: t('contacts.surname'),
    emailLabel: t('contacts.email'),
    messageLabel: t('contacts.message'),
    sendLabel: t('contacts.send'),
    successMessage: t('contacts.success'),
    errorMessage: t('contacts.error'),
    invalidEmail: t('contacts.invalidEmail'),
  }
}

export function getDefaultServiceTemplateContent(t: Translator): ServiceTemplateContent {
  return {
    readMore: t('services.readMore'),
  }
}

export function getDefaultNotFoundSections(t: Translator): NotFoundSectionContent {
  return {
    label: t('notFound'),
    home: t('notFoundPage.home'),
    contacts: t('notFoundPage.contacts'),
  }
}
