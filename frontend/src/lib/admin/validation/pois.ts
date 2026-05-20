export function isCoordinateInRange(field: 'lat' | 'lng', value: number) {
  if (field === 'lat') {
    return value >= -90 && value <= 90
  }

  return value >= -180 && value <= 180
}

export function getCoordinateError(field: 'lat' | 'lng', value: string) {
  const nextValue = value.trim()
  if (!nextValue || Number.isNaN(Number.parseFloat(nextValue))) {
    return 'Inserisci un numero valido'
  }

  const parsed = Number(nextValue)
  if (!isCoordinateInRange(field, parsed)) {
    return field === 'lat'
      ? 'La latitudine deve essere compresa tra -90 e 90'
      : 'La longitudine deve essere compresa tra -180 e 180'
  }

  return ''
}

export function parseCoordinateValue(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}
