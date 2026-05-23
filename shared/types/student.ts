import type { ApiBatchStatus, ApiCourseLevel, PaginationMeta } from '#imports';

export type StudentStatus = 'active' | 'inactive' | 'graduated';
export type StudentGender = 'male' | 'female' | 'other';

export interface BatchRef {
  id: string;
  batch_name: string;
  batch_code: string;
  status: ApiBatchStatus;
}

export interface CourseRef {
  id: string;
  course_name: string;
  course_code: string;
  level: ApiCourseLevel | null;
}

export interface EnrollmentSummary {
  id: string;
  status: 'enrolled' | 'dropped' | 'completed';
  payment_status: 'pending' | 'partial' | 'paid';
  enrollment_date: string;
  batch: BatchRef;
  course: CourseRef;
}

export interface StudentObject {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: StudentGender | null;
  address: string | null;
  parent_name: string | null;
  parent_phone: string | null;
  registration_date: string;
  status: StudentStatus;
  created_at: string;
  updated_at: string;
}

export interface StudentListItem extends StudentObject {
  enrolled_batches: string[];
}

export interface StudentListResponse {
  data: StudentListItem[];
  pagination: PaginationMeta;
}

export interface StudentDetail extends StudentObject {
  enrollments: EnrollmentSummary[];
}

export interface CreateStudentPayload {
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: StudentGender | null;
  address?: string | null;
  parent_name?: string | null;
  parent_phone?: string | null;
  registration_date?: string | null;
}

export interface UpdateStudentPayload {
  first_name?: string;
  last_name?: string;
  email?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: StudentGender | null;
  address?: string | null;
  parent_name?: string | null;
  parent_phone?: string | null;
  status?: StudentStatus;
}
