import { AxiosResponse } from 'axios';
import agent from '../base';
import { Article, ArticleRequest, PageArticles, PageOptions } from '@/api/articles/types.ts';

class ArticlesApi {
  async getArticles(options: PageOptions): Promise<PageArticles | undefined> {
    let requestUrl = 'article';
    requestUrl += `?page=${options.page}&take=${options.take}`;
    if (options.order) requestUrl += `&order=${options.order}`;
    if (options.search && options.search.length) requestUrl += `&search=${options.search}`;
    if (options.category && options.category.length) requestUrl += `&category=${options.category}`;

    const response: AxiosResponse<PageArticles> = await agent.get<PageArticles>(requestUrl);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return undefined;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const response: AxiosResponse<Article> = await agent.get(`article/${id}`);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return undefined;
  }

  async deleteArticle(id: number): Promise<boolean | undefined> {
    const response: AxiosResponse<boolean> = await agent.delete<boolean>(`article/${id}`);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return undefined;
  }

  async createArticle(body: ArticleRequest): Promise<Article | undefined> {
    const response: AxiosResponse<Article> = await agent.post<Article>(`article`, body);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return undefined;
  }

  async updateArticle(id: number, body: ArticleRequest): Promise<Article | undefined> {
    const response: AxiosResponse<Article> = await agent.put<Article>(`article/${id}`, body);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return undefined;
  }
}

const articlesApi = new ArticlesApi();
export default articlesApi;
