export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  access_token: string;
  uuid: string;
  name: string | null;
  avatar: string | null;
}
