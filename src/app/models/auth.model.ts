export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { id: number; username: string } | null;
  token: string | null;
}