export type CourseLevel =
  | 'Beginner'
  | 'Bridge'
  | 'Intermediate'
  | 'Advanced'
  | 'Specialty';
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Mon, 6 = Sun
export type Recurrence = 'Weekly' | 'Biweekly' | 'Once';

export interface ScheduleSession {
  id: string;
  code: string;
  course: string;
  instructor: string;
  room: string;
  day: DayOfWeek;
  timeStart: string; // e.g. "9:00 AM"
  timeEnd: string; // e.g. "11:00 AM"
  level: CourseLevel;
  recurrence: Recurrence;
}
