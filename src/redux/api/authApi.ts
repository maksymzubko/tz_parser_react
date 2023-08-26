import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/api/axiosBaseQuery.ts';
import { AxiosError } from 'axios';
import { LoginRequest, LoginResponse } from '@/redux/api/types/auth.types.ts';
import { setAuthorized } from '@/redux/store/user/slice.ts';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['User'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    verifyToken: builder.query({
      query: () => `auth/verify-token`,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setAuthorized({ isAuthorized: true }));
        } catch (error) {
          console.log('');
        }
      }
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: `auth/login`, method: 'POST', data: body }),
      invalidatesTags: ['User'],
      transformErrorResponse: (response: AxiosError<{ timestamp: string; errors: any[] }, any>) => response,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setAuthorized({ isAuthorized: true }));
        } catch (error) {
          console.log('');
        }
      }
    })
  })
});

export const { useLoginMutation, useVerifyTokenQuery } = authApi;
