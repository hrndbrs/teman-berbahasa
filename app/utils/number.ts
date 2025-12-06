/**
 * Number utility functions
 */

/**
 * Format a number as Indonesian Rupiah currency
 * @param value - The number to format
 * @returns Formatted currency string (e.g., "Rp 2.736.000")
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });
}
