export type CourseCategory = 'Kelas Reguler' | 'Kelas Intensif JLPT';

export interface CourseLanguage {
  name: string;
  ready: boolean;
}

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
  seoDescription: string;
  category: CourseCategory;
  language: string;
  sessionCount: number;
  maxStudents: number;
  price: number;
  image: string;
  imageAlt: string;
  schedules: CourseSchedule[];
}

export interface ProgramSchedule {
  id: string;
  label: string;
  days: string;
  time: string;
  start: string;
  open: boolean;
  registrationUrl: string;
}

export interface Program {
  id: string;
  slug: string;
  num: string;
  kind: CourseCategory;
  title: string;
  language: string;
  price: string;
  priceValue: number;
  desc: string;
  facts: string[];
  image: string;
  imageAlt: string;
  schedules: ProgramSchedule[];
}

export type ApiCourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type ApiCourseStatus = 'active' | 'archived';

export interface ApiCourseRef {
  id: string;
  course_name: string;
  course_code: string;
  level: ApiCourseLevel | null;
}

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

export interface UpdateCoursePayload {
  course_name?: string;
  course_code?: string;
  description?: string | null;
  subject?: string | null;
  level?: ApiCourseLevel | null;
  session_count?: number | null;
  price?: string | null;
  max_capacity?: number | null;
}
