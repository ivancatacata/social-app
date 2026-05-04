export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  provider: 'email' | 'google';
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isHydrated: boolean;
}
