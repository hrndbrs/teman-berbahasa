const JAKARTA = 'Asia/Jakarta';

export function formatShortDate(value: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatLongDate(value: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export function formatSessionDateTime(value: Date | string): string {
  const date = new Date(value);
  const day = formatLongDate(date);
  const time = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: JAKARTA,
  }).format(date);
  return `${day} · ${time} WIB`;
}

export function isPast(value: Date | string): boolean {
  return Date.now() > new Date(value).getTime();
}
