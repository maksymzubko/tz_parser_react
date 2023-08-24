export interface Article {
  id: number;
  title: string;
  sourceLink: string;
  date: string;
  content: string;
  image: string;
  categories: string[];
}

export interface PageMeta {
  page: number;
  take: number;
  search: string;
  category: string;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PageArticles {
  data: Article[];
  meta: PageMeta;
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface PageOptions {
  order?: Order;
  page?: number;
  take?: number;
  search?: string;
  category?: string;
}
