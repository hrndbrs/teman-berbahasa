export function formatPhoneNumber(phone?: string): string {
  if (!phone) return '';

  const hasPlus = phone.startsWith('+');
  const digits = phone.replace(/\D/g, '');

  if (digits.startsWith('62')) {
    const local = digits.slice(2);
    return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
  }

  if (digits.startsWith('0')) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  }

  return hasPlus ? digits : `+${digits}`;
}
