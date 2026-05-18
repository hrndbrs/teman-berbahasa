export type UserRole = 'admin' | 'teacher' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  status: 'active' | 'inactive';
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
