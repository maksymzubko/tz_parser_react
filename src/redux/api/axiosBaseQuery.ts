import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';
import { setAuthorized } from '@/redux/store/user/slice.ts';

type Response = { data: any } | { error: AxiosError<{ timestamp: string; errors: any[] }> };

export const axiosBaseQuery: BaseQueryFn = async (args, { dispatch }): Promise<Response> => {
  try {
    const result = await axiosInstance.request(args);
    return { data: result.data };
  } catch (error: unknown) {
    const err = error as AxiosError<{ timestamp: string; errors: any[] }>;

    if (err.response?.status === 401) {
      try {
        dispatch(setAuthorized({ isAuthorized: false }));
      } catch {
        console.log('');
      }
    }

    return {
      error: err
    };
  }
};
