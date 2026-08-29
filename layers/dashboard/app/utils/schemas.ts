import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

export const forgotPasswordSchema = z.object({
  email: z.email('Format email tidak valid'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirm: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.confirm === data.password, {
    message: 'Password tidak cocok',
    path: ['confirm'],
  });

export type LoginSchema = z.output<typeof loginSchema>;
export type ForgotPasswordSchema = z.output<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.output<typeof resetPasswordSchema>;

export const courseFormSchema = z.object({
  course_name: z.string().min(1, 'Nama kursus wajib diisi'),
  course_code: z
    .string()
    .min(1, 'Kode kursus wajib diisi')
    .regex(/^[A-Z0-9-]+$/, 'Hanya huruf kapital, angka, dan tanda hubung'),
  description: z.string().optional(),
  subject: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  session_count: z.number().int().positive().optional(),
  price: z.string().optional(),
  max_capacity: z.number().int().positive().optional(),
});

export type CourseFormSchema = z.output<typeof courseFormSchema>;

export const batchFormSchema = z.object({
  batch_name: z.string().min(1, 'Nama batch wajib diisi'),
  batch_code: z
    .string()
    .min(1, 'Kode batch wajib diisi')
    .regex(/^[A-Z0-9-]+$/, 'Hanya huruf kapital, angka, dan tanda hubung'),
  course_id: z.string().min(1, 'Kursus wajib dipilih'),
  instructor_user_id: z.string().min(1, 'Instruktur wajib dipilih'),
  academic_year: z.string().optional(),
});

export type BatchFormSchema = z.output<typeof batchFormSchema>;

export const scheduleFormSchema = z.object({
  batch_id: z.string().min(1, 'Batch wajib dipilih'),
  instructor_user_id: z.string().optional(),
  day_of_week: z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]),
  start_time: z.string().min(1, 'Jam mulai wajib diisi'),
  end_time: z.string().min(1, 'Jam selesai wajib diisi'),
  room: z.string().optional(),
  recurrence: z.enum(['weekly', 'one-time']),
  effective_from: z.string().min(1, 'Tanggal mulai wajib diisi'),
  effective_until: z.string().optional(),
});

export type ScheduleFormSchema = z.output<typeof scheduleFormSchema>;

export const overrideFormSchema = z.object({
  original_date: z.string().min(1, 'Tanggal asli wajib diisi'),
  override_type: z.enum(['reschedule', 'instructor_change']),
  new_date: z.string().optional(),
  new_start_time: z.string().optional(),
  new_end_time: z.string().optional(),
  new_room: z.string().optional(),
  new_instructor_user_id: z.string().optional(),
  reason: z.string().optional(),
});

export type OverrideFormSchema = z.output<typeof overrideFormSchema>;
