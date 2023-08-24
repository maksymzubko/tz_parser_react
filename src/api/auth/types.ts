export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
}

export interface RegisterResponse {
  password: string;
  email: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  access_token: string;
  uuid: string;
  name: string | null;
  avatar: string | null;
}
