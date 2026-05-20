// ── Marketing site (static data) ─────────────────────────────────────────────

export type CourseCategory = 'Kelas Reguler' | 'Kelas Intensif JLPT';

export interface CourseSchedule {
  id: string;
  days: string;
  time: string;
  startDate: Date;
  registrationUrl: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: CourseCategory;
  maxStudents: number;
  price: number;
  schedules: CourseSchedule[];
}

// ── Dashboard / API course types ──────────────────────────────────────────────

export type ApiCourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type ApiCourseStatus = 'active' | 'archived';

export interface ApiCourse {
  id: string;
  course_name: string;
  course_code: string;
  description: string | null;
  subject: string | null;
  level: ApiCourseLevel | null;
  session_count: number | null;
  price: string | null;
  max_capacity: number | null;
  status: ApiCourseStatus;
  created_at: string;
  updated_at: string;
}

export interface ApiCourseWithStats extends ApiCourse {
  batch_count: number;
  ongoing_batch_count: number;
  enrolled_count: number;
}

export interface CreateCoursePayload {
  course_name: string;
  course_code: string;
  description?: string;
  subject?: string;
  level?: ApiCourseLevel;
  session_count?: number;
  price?: string;
  max_capacity?: number;
}

export type UpdateCoursePayload = Partial<CreateCoursePayload>;
