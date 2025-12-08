/**
 * String utility functions
 */

/**
 * Format a phone number to Indonesian format
 * @param phone - Phone number string (e.g., "6281234567890" or "+6281234567890")
 * @returns Formatted phone number (e.g., "+62 812-3456-7890")
 */
export function formatPhoneNumber(phone?: unknown): string {
  if (!phone) return '';

  const phoneStr = typeof phone === 'string' ? phone : String(phone);

  // Remove all non-digit characters except leading +
  const hasPlus = phoneStr.startsWith('+');
  const digits = phoneStr.replace(/\D/g, '');

  // Handle Indonesian numbers (starting with 62 or 0)
  if (digits.startsWith('62')) {
    // International format: 62 8xx xxxx xxxx
    const local = digits.slice(2);
    return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
  }

  if (digits.startsWith('0')) {
    // Local format: 08xx xxxx xxxx
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  }

  // Other format, just add + if it wasn't there
  return hasPlus ? digits : `+${digits}`;
}
