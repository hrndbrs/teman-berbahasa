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
