export function loadPct(attending: number, capacity: number): number {
  return capacity > 0 ? Math.round((attending / capacity) * 100) : 0;
}

export function loadPctColor(pct: number): string {
  if (pct >= 80) return 'text-[var(--ui-error)] font-semibold';
  if (pct >= 60) return 'text-[var(--ui-warning)]';
  return 'text-muted';
}

export function loadBarColor(pct: number): string {
  if (pct >= 80) return 'bg-[var(--ui-error)]';
  return 'bg-primary-500';
}
