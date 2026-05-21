export type UserRole = 'admin' | 'teacher' | 'staff';

export interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
}

export interface AuthState {
  user: UserInfo | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: UserInfo;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface ApiUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}
