import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/api/axiosBaseQuery.ts';
import { AxiosError } from 'axios';
import { Article, ArticleRequest, PageArticles, PageOptions } from '@/redux/api/types/article.types.ts';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  tagTypes: ['PageArticle', 'Article'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getArticles: builder.query<PageArticles, PageOptions>({
      query(options: PageOptions) {
        let requestUrl = 'article';
        requestUrl += `?page=${options.page}&take=${options.take}`;
        if (options.order) requestUrl += `&order=${options.order}`;
        if (options.search && options.search.length) requestUrl += `&search=${options.search}`;
        if (options.category && options.category.length) requestUrl += `&category=${options.category}`;

        return requestUrl;
      },
      providesTags: ['PageArticle']
    }),
    getArticleById: builder.query<Article, string>({
      query: (articleId: string) => `article/${articleId}`,
      providesTags: (result, error, id) => [{ type: 'PageArticle', id }]
    }),
    addArticle: builder.mutation<Article, ArticleRequest>({
      query: (body) => ({ url: `article`, method: 'POST', data: body }),
      invalidatesTags: ['PageArticle'],
      transformErrorResponse: (response: AxiosError<{ timestamp: string; errors: any[] }, any>) => response
    }),
    updateArticle: builder.mutation<Article, { id: string; body: ArticleRequest }>({
      query: ({ id, body }) => ({ url: `article/${id}`, method: 'PUT', data: body }),
      invalidatesTags: ['PageArticle'],
      transformErrorResponse: (response: AxiosError<{ timestamp: string; errors: any[] }, any>) => {
        console.log(response.response);
        return response;
      }
    }),
    deleteArticle: builder.mutation<Article, string>({
      query: (id) => ({ url: `article/${id}`, method: 'DELETE' }),
      invalidatesTags: ['PageArticle'],
      transformErrorResponse: (response: AxiosError<{ timestamp: string; errors: any[] }, any>) => response
    })
  })
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation
} = articleApi;
