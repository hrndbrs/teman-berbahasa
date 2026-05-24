import type { ApiInstructorRef, ApiBatchRef, ApiCourseRef } from '#imports';

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
  date: string;
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

export type ApiDayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type ApiRecurrence = 'weekly' | 'one-time';

export type ApiSessionStatus =
  | 'scheduled'
  | 'rescheduled'
  | 'instructor_changed';

export type ApiOverrideType = 'reschedule' | 'instructor_change';

export interface ApiSchedule {
  id: string;
  batch_id: string;
  course_id: string;
  instructor: ApiInstructorRef | null;
  day_of_week: ApiDayOfWeek;
  start_time: string;
  end_time: string;
  room: string | null;
  recurrence: ApiRecurrence;
  effective_from: string;
  effective_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiScheduleOverride {
  id: string;
  schedule_id: string;
  original_date: string;
  override_type: ApiOverrideType;
  new_date: string | null;
  new_start_time: string | null;
  new_end_time: string | null;
  new_room: string | null;
  new_instructor: ApiInstructorRef | null;
  reason: string | null;
  created_by_user_id: string;
  created_at: string;
}

export interface ApiSession {
  schedule_id: string;
  date: string;
  original_date: string | null;
  day_of_week: ApiDayOfWeek;
  start_time: string;
  end_time: string;
  room: string | null;
  status: ApiSessionStatus;
  effective_instructor: ApiInstructorRef;
  batch: ApiBatchRef;
  course: ApiCourseRef;
  override: ApiScheduleOverride | null;
}

export interface ApiWeeklyResponse {
  week_start: string;
  week_end: string;
  total_sessions: number;
  total_hours: number;
  data: ApiSession[];
}

export interface CreateSchedulePayload {
  instructor_user_id?: string;
  day_of_week: ApiDayOfWeek;
  start_time: string;
  end_time: string;
  room?: string;
  recurrence: ApiRecurrence;
  effective_from: string;
  effective_until?: string;
}

export interface UpdateSchedulePayload {
  instructor_user_id?: string | null;
  day_of_week?: ApiDayOfWeek;
  start_time?: string;
  end_time?: string;
  room?: string | null;
  recurrence?: ApiRecurrence;
  effective_from?: string;
  effective_until?: string | null;
}

export interface CreateOverridePayload {
  original_date: string;
  override_type: ApiOverrideType;
  new_date?: string;
  new_start_time?: string;
  new_end_time?: string;
  new_room?: string;
  new_instructor_user_id?: string;
  reason?: string;
}

export interface UpdateOverridePayload {
  new_date?: string | null;
  new_start_time?: string;
  new_end_time?: string;
  new_room?: string;
  new_instructor_user_id?: string;
  reason?: string;
}
