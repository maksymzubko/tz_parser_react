import { AxiosResponse } from 'axios';
import agent from '../base';
import { Article, PageArticles, PageOptions } from '@/api/articles/types.ts';

class ArticlesApi {
  async getArticles(options: PageOptions): Promise<PageArticles | undefined> {
    let requestUrl = 'article';
    requestUrl += `?page=${options.page}&take=${options.take}`;
    if (options.order) requestUrl += `&order=${options.order}`;
    if (options.search && options.search.length) requestUrl += `&search=${options.search}`;
    if (options.category && options.category.length) requestUrl += `&category=${options.category}`;

    const response: AxiosResponse = await agent.get(requestUrl);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return undefined;
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const response: AxiosResponse = await agent.get(`article/${id}`);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    return undefined;
  }
}

const articlesApi = new ArticlesApi();
export default articlesApi;