import type { ApiCourseRef, ApiInstructorRef } from '#imports';

export type ApiBatchStatus = 'ongoing' | 'upcoming' | 'completed';

export type ApiBatchCourseRef = Omit<ApiCourseRef, 'level'>;

export interface ApiBatchRef {
  id: string;
  batch_name: string;
  batch_code: string;
  status?: ApiBatchStatus;
}

export interface ApiBatch {
  id: string;
  batch_name: string;
  batch_code: string;
  status: ApiBatchStatus;
  course: ApiBatchCourseRef;
  instructor: ApiInstructorRef;
  enrolled_count: number;
  academic_year: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateBatchPayload {
  course_id: string;
  instructor_user_id: string;
  batch_name: string;
  batch_code: string;
  academic_year?: string;
}

export interface UpdateBatchPayload {
  instructor_user_id?: string;
  batch_name?: string;
  batch_code?: string;
  academic_year?: string | null;
}

export interface BatchStatusUpdate {
  id: string;
  status: ApiBatchStatus;
  updated_at: string;
}
