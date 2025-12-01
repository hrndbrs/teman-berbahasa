/**
 * Date utility functions
 */

/**
 * Format an ISO date string to Indonesian locale date
 * @param isoString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
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

/**
 * Format an ISO date string to Indonesian locale time
 * @param isoString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted time string
 */
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

/**
 * Format an ISO date string to Indonesian locale date and time
 * @param isoString - ISO date string
 * @returns Formatted date and time string
 */
export function formatDateTime(isoString?: string): string {
  if (!isoString) return '';
  return `${formatDate(isoString)} ${formatTime(isoString)}`;
}
