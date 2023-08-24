import axios from 'axios';
import Cookies from 'js-cookie';

const agent = axios.create({
  baseURL: process.env.VITE_API_TZ ?? 'http://localhost:3000/v1/'
});

agent.interceptors.request.use(
  async (config: any) => {
    const token = Cookies.get('tz_token');
    if (token) {
      try {
        const data = JSON.parse(token);
        config.headers!.Authorization = `Bearer ${data.access_token.toString()}`;
      } catch (e) {
        Cookies.remove('tz_token');
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
    const token = Cookies.get('tz_token');

    if (error.response.status === 401 && token) {
      Cookies.remove('tz_token');
    }
    return Promise.reject(error);
  }
);

export default agent;
