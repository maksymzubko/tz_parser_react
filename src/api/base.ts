import axios from 'axios';
import Cookies from 'js-cookie';

const agent = axios.create({
  baseURL: process.env.VITE_API_TZ ?? 'http://localhost:3000/v1/',
  withCredentials: true
});

agent.interceptors.request.use(
  async (config: any) => {
    const token = Cookies.get('access_token_tz_demo');
    if (token) {
      try {
        config.headers!.Authorization = `Bearer ${token}`;
      } catch (e) {
        Cookies.remove('access_token_tz_demo');
      }
    }

    config.headers!['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

agent.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const token = Cookies.get('access_token_tz_demo');

    if (error.response.status === 401 && token) {
      Cookies.remove('access_token_tz_demo');
    }
    return Promise.reject(error);
  }
);

export default agent;
