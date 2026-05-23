import type { ApiBatchStatus } from '#imports';

export type EnrollmentStatus = 'enrolled' | 'dropped' | 'completed';
export type PaymentStatus = 'pending' | 'partial' | 'paid';

export interface EnrollmentStudentRef {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
}

export interface EnrollmentBatchRef {
  id: string;
  batch_name: string;
  batch_code: string;
  status: ApiBatchStatus;
}

export interface EnrollmentCourseRef {
  id: string;
  course_name: string;
  course_code: string;
}

export interface EnrollmentDetail {
  id: string;
  status: EnrollmentStatus;
  payment_status: PaymentStatus;
  final_grade: string | null;
  enrollment_date: string;
  student: EnrollmentStudentRef;
  batch: EnrollmentBatchRef;
  course: EnrollmentCourseRef;
  created_at: string;
  updated_at: string;
}

export interface CreateEnrollmentPayload {
  student_id: string;
  batch_id: string;
}

export interface UpdateEnrollmentPayload {
  status?: 'dropped' | 'completed';
  payment_status?: 'partial' | 'paid';
  final_grade?: string;
}
