export type ApiBatchStatus = 'ongoing' | 'upcoming' | 'completed';

export interface ApiBatch {
  id: string;
  batch_name: string;
  batch_code: string;
  course_id: string;
  course_name: string;
  course_code: string;
  status: ApiBatchStatus;
  enrolled_count: number;
  instructor_name: string | null;
  instructor_initials: string | null;
  academic_year: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface CreateBatchPayload {
  batch_name: string;
  batch_code: string;
  course_id: string;
  start_date?: string;
  end_date?: string;
  academic_year?: string;
}

export type UpdateBatchPayload = Partial<CreateBatchPayload>;
