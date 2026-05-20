export function getBookingConfigError(value: string) {
  try {
    const parsed = JSON.parse(value)

    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
      return 'La configurazione avanzata deve essere un oggetto JSON valido.'
    }

    return ''
  } catch {
    return 'Controlla la configurazione avanzata: il JSON non e valido.'
  }
}
