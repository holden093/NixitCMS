import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import type { LocaleCode } from '@/types/api'
import en from './locales/en.json'
import it from './locales/it.json'

export const DEFAULT_LOCALE: LocaleCode = 'it'
export const MANUAL_LOCALE_STORAGE_KEY = 'cms.locale'
export const SUPPORTED_LOCALES = ['it', 'en'] as const

export function normalizeLocale(value?: string | null): LocaleCode | null {
  if (!value) {
    return null
  }

  const normalized = value.trim().toLowerCase()

  if (normalized === 'it' || normalized.startsWith('it-') || normalized.startsWith('it_')) {
    return 'it'
  }

  if (normalized === 'en' || normalized.startsWith('en-') || normalized.startsWith('en_')) {
    return 'en'
  }

  return null
}

function hasWindow() {
  return typeof window !== 'undefined'
}

function hasLocalStorage() {
  if (!hasWindow()) {
    return false
  }

  try {
    return typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

export function getQueryLocale(search?: string): LocaleCode | null {
  const nextSearch = search ?? (hasWindow() ? window.location.search : '')
  return normalizeLocale(new URLSearchParams(nextSearch).get('lang'))
}

export function readManualLocalePreference(): LocaleCode | null {
  if (!hasLocalStorage()) {
    return null
  }

  try {
    return normalizeLocale(window.localStorage.getItem(MANUAL_LOCALE_STORAGE_KEY))
  } catch {
    return null
  }
}

export function writeManualLocalePreference(locale: LocaleCode) {
  if (!hasLocalStorage()) {
    return
  }

  try {
    window.localStorage.setItem(MANUAL_LOCALE_STORAGE_KEY, locale)
  } catch {}
}

export function getBrowserLocale(): LocaleCode {
  if (!hasWindow()) {
    return DEFAULT_LOCALE
  }

  const browserLanguages = [...(window.navigator.languages ?? []), window.navigator.language]
  const detectedLocale = browserLanguages
    .map(language => normalizeLocale(language))
    .find((locale): locale is LocaleCode => locale !== null)

  return detectedLocale ?? DEFAULT_LOCALE
}

export function resolveLocale(search?: string): LocaleCode {
  return getQueryLocale(search) ?? readManualLocalePreference() ?? getBrowserLocale() ?? DEFAULT_LOCALE
}

function syncDocumentLanguage(language?: string | null) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = normalizeLocale(language) ?? DEFAULT_LOCALE
}

export async function changeLanguageFromUserPreference(locale: LocaleCode) {
  writeManualLocalePreference(locale)
  await i18n.changeLanguage(locale)
}

const initPromise = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { it: { translation: it }, en: { translation: en } },
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: MANUAL_LOCALE_STORAGE_KEY,
      caches: [],
      convertDetectedLanguage: language => normalizeLocale(language) ?? language,
    },
  })

if (typeof document !== 'undefined') {
  i18n.on('languageChanged', syncDocumentLanguage)
  void initPromise.then(() => {
    syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language)
  })
}

export default i18n
