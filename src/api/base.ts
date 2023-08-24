import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const agent = axios.create({
  baseURL: process.env.VITE_API_TZ ?? 'http://localhost:3000/v1/',
  withCredentials: true
});

const onRequest = (config: InternalAxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);
  const token = Cookies.get('access_token_tz_demo');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  const token = Cookies.get('access_token_tz_demo');

  if (error.response.status === 401 && token) {
    Cookies.remove('access_token_tz_demo');
  }
  return Promise.reject(error);
};

agent.interceptors.request.use(onRequest, onRequestError);

agent.interceptors.response.use(onResponse, onResponseError);

export default agent;
