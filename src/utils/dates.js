export function toDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getToday() {
  return toDateString(new Date())
}

export function getOffsetDate(daysAgo) {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return toDateString(date)
}

export function parseDateString(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(dateString, amount) {
  const date = parseDateString(dateString)
  date.setDate(date.getDate() + amount)
  return toDateString(date)
}

export function formatDateLabel(dateString) {
  return parseDateString(dateString).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}