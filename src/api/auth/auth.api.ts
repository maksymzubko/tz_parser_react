import { AxiosResponse } from 'axios';
import agent from '../base';
import { Login, LoginResponse } from './types';
class AuthApi {
  async login(data: Login): Promise<LoginResponse | undefined> {
    const response: AxiosResponse = await agent.post(`auth/login`, data);

    if (response.status === 200 || response.status === 201) {
      const { id, email, access_token, uuid, name, avatar } = response.data;
      localStorage.setItem(
        'quickly_summary_token',
        JSON.stringify({ id, email, access_token, uuid, isCustom: false, name, avatar })
      );
      return response.data;
    }

    return undefined;
  }

  async verifyToken(): Promise<boolean> {
    const response: AxiosResponse = await agent.get(`auth/verify-token`);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return false;
  }
}

const authApi = new AuthApi();
export default authApi;
