import React, { useEffect, useState } from 'react';
import { Order, PageArticles, PageOptions } from '@/api/articles/types.ts';
import articlesApi from '@/api/articles/articles.api.ts';
import ArticleCard from '@/components/cards/ArticleCard.tsx';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '@/components/shared/Pagination.tsx';
import Loader from '@/components/ui/Loader.tsx';
import FilterAccordion from '@/components/ui/filter-accordion.tsx';
import {useToast} from "@/components/ui/use-toast.ts";

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const {toast} = useToast();
  const [options, setOptions] = useState<PageOptions>({
    take: 10,
    page: 1,
    category: '',
    search: '',
    order: Order['DESC']
  });
  const [articles, setArticles] = useState<PageArticles>({
    data: [],
    meta: {
      page: 1,
      category: '',
      pageCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      itemCount: 0,
      search: '',
      take: 0
    }
  });

  useEffect(() => {
    setLoading(true);
    articlesApi
      .getArticles(options)
      .then((res) => {
        setArticles(res);
        setTimeout(() => {
          scroll({ top: 0, behavior: 'smooth' });
        }, 100);
      })
      .catch((reason) => {
        toast({
          title: 'Помилка :(',
          description: 'Щось пішло не так, спробуйте ще!',
          duration: 1500,
          variant: 'destructive'
        });
      })
      .finally(() => setLoading(false));
  }, [options]);

  const onChange = (_options: PageOptions) => {
    setOptions((prev) => {
      return { ...prev, ..._options };
    });
  };

  const onNext = () => {
    if (articles.meta && articles.meta.hasNextPage)
      setOptions((prev) => {
        return { ...prev, page: prev.page + 1 };
      });
  };

  const onPrev = () => {
    if (articles.meta && articles.meta.hasPreviousPage)
      setOptions((prev) => {
        return { ...prev, page: prev.page - 1 };
      });
  };

  return (
    <div className={'max-w-full dark:rounded-full flex flex-col gap-4'}>
      <FilterAccordion onChange={onChange} />

      {loading && (
        <div className={'fixed top-1/2 left-1/2'}>
          <Loader />
        </div>
      )}

      <section
        className={`${
          loading ? 'invisible' : 'visible'
        } transition ease-in flex flex-wrap gap-4 w-full justify-between px-16`}
      >
        {articles?.data?.length > 0 ? (
          articles.data.map((a) => <ArticleCard key={`article-card-${uuidv4()}`} article={a} />)
        ) : (
          <div className={'text-base-regular'}>No data found</div>
        )}
      </section>

      <section className={'mb-14 mt-5'}>
        {articles?.meta && !loading && <Pagination meta={articles?.meta} onNext={onNext} onPrev={onPrev} />}
      </section>
    </div>
  );
};

export default Landing;
