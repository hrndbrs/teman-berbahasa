export type ApiBatchStatus = 'ongoing' | 'upcoming' | 'completed';

export interface ApiBatchCourseRef {
  id: string;
  course_name: string;
  course_code: string;
}

export interface ApiBatchInstructorRef {
  id: string;
  first_name: string;
  last_name: string;
}

export interface ApiBatch {
  id: string;
  batch_name: string;
  batch_code: string;
  status: ApiBatchStatus;
  course: ApiBatchCourseRef;
  instructor: ApiBatchInstructorRef;
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

export type UpdateBatchPayload = Partial<Omit<CreateBatchPayload, 'course_id'>>;
