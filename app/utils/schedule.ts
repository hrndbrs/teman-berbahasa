import type { CourseLevel, ScheduleSession } from '#shared/types/schedule';

export const GRID_START_HOUR = 8;
export const GRID_END_HOUR = 20;
export const HOUR_HEIGHT = 64; // px per hour
export const GRID_START = GRID_START_HOUR * 60; // minutes
export const GRID_END = GRID_END_HOUR * 60; // minutes
export const SNAP_MINUTES = 30;

export const LEVEL_COLORS: Record<CourseLevel, string> = {
  Beginner:
    'bg-success-50 border-success-200 text-success-700 dark:bg-success-950/30 dark:text-success-400',
  Bridge:
    'bg-info-50 border-info-200 text-info-700 dark:bg-info-950/30 dark:text-info-400',
  Intermediate:
    'bg-warning-50 border-warning-200 text-warning-700 dark:bg-warning-950/30 dark:text-warning-400',
  Advanced:
    'bg-error-50 border-error-200 text-error-700 dark:bg-error-950/30 dark:text-error-400',
  Specialty:
    'bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-neutral-800/50 dark:text-neutral-400',
};

export const ALL_LEVELS: CourseLevel[] = [
  'Beginner',
  'Bridge',
  'Intermediate',
  'Advanced',
  'Specialty',
];

export const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const DAY_NAMES_FULL = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const TIMETABLE_HOURS = Array.from(
  { length: GRID_END_HOUR - GRID_START_HOUR },
  (_, i) => GRID_START_HOUR + i
);

/** "9:00 AM" → 540 */
export function toMinutes(time: string): number {
  const [timePart = '', period = ''] = time.split(' ');
  const [hStr = '0', mStr = '0'] = timePart.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  const hours =
    period === 'PM' && h !== 12 ? h + 12 : period === 'AM' && h === 12 ? 0 : h;
  return hours * 60 + m;
}

/** 540 → "9:00 AM" */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
}

/** 8 → "8:00 AM" */
export function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayH = hour > 12 ? hour - 12 : hour;
  return `${displayH}:00 ${period}`;
}

export function blockTop(timeStart: string): number {
  return ((toMinutes(timeStart) - GRID_START) / 60) * HOUR_HEIGHT;
}

export function blockHeight(timeStart: string, timeEnd: string): number {
  return ((toMinutes(timeEnd) - toMinutes(timeStart)) / 60) * HOUR_HEIGHT;
}

export interface SessionLayout {
  session: ScheduleSession;
  colIndex: number;
  colCount: number;
}

export function layoutDaySessions(
  sessions: ScheduleSession[]
): SessionLayout[] {
  if (!sessions.length) return [];

  const sorted = [...sessions].sort(
    (a, b) => toMinutes(a.timeStart) - toMinutes(b.timeStart)
  );

  function overlaps(a: ScheduleSession, b: ScheduleSession): boolean {
    return (
      toMinutes(a.timeStart) < toMinutes(b.timeEnd) &&
      toMinutes(b.timeStart) < toMinutes(a.timeEnd)
    );
  }

  // Greedy column assignment
  const colEnds: number[] = [];
  const colOf = new Map<string, number>();

  for (const s of sorted) {
    const start = toMinutes(s.timeStart);
    let ci = colEnds.findIndex((end) => end <= start);
    if (ci === -1) ci = colEnds.length;
    colEnds[ci] = toMinutes(s.timeEnd);
    colOf.set(s.id, ci);
  }

  return sorted.map((s) => {
    const concurrent = sorted.filter((other) => overlaps(s, other));
    const colCount = Math.max(...concurrent.map((c) => colOf.get(c.id)! + 1));
    return { session: s, colIndex: colOf.get(s.id)!, colCount };
  });
}
