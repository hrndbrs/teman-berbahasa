export function formatDate(
  isoString?: string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }
): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('id-ID', options);
}

export function formatTime(
  isoString?: string,
  options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  },
  showTimezone = true
): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const time = date.toLocaleTimeString('id-ID', options);
  return showTimezone ? `${time} WIB` : time;
}

export function formatDateTime(isoString?: string): string {
  if (!isoString) return '';
  return `${formatDate(isoString)} ${formatTime(isoString)}`;
}

export function formatDateObject(date?: Date): string {
  if (!date) return '';
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
