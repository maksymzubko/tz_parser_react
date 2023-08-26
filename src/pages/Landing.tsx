import React, { useEffect, useState } from 'react';
import ArticleCard from '@/components/cards/ArticleCard.tsx';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '@/components/shared/Pagination.tsx';
import Loader from '@/components/ui/Loader.tsx';
import FilterAccordion from '@/components/ui/filter-accordion.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { useGetArticlesQuery } from '@/redux/api/articleApi.ts';
import { Order, PageOptions } from '@/redux/api/types/article.types.ts';

const Landing = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<PageOptions>({
    take: 10,
    page: 1,
    category: '',
    search: '',
    order: Order['DESC']
  });

  const { data, isError, isLoading } = useGetArticlesQuery(options);

  useEffect(() => {
    setTimeout(() => {
      scroll({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Помилка :(',
        description: 'Щось пішло не так, спробуйте ще!',
        duration: 1500,
        variant: 'destructive'
      });
    }
  }, [isError, toast]);

  const onChange = (_options: PageOptions) => {
    setOptions((prev) => {
      return { ...prev, ..._options };
    });
  };

  const onNext = () => {
    if (data.meta && data.meta.hasNextPage)
      setOptions((prev) => {
        return { ...prev, page: prev.page + 1 };
      });
  };

  const onPrev = () => {
    if (data.meta && data.meta.hasPreviousPage)
      setOptions((prev) => {
        return { ...prev, page: prev.page - 1 };
      });
  };

  return (
    <div className={'max-w-full dark:rounded-full flex flex-col gap-4'}>
      <FilterAccordion onChange={onChange} />

      {isLoading && (
        <div className={'fixed top-1/2 left-1/2'}>
          <Loader />
        </div>
      )}

      <section
        className={`${
          isLoading ? 'invisible' : 'visible'
        } transition ease-in flex flex-wrap gap-4 w-full justify-between px-16`}
      >
        {data?.data.length > 0 ? (
          data.data.map((a) => <ArticleCard key={`article-card-${uuidv4()}`} article={a} />)
        ) : (
          <h2 className={'text-base-regular font-bold text-[32px] text-center w-full'}>Нічого не знайдено</h2>
        )}
      </section>

      <section className={'mb-14 mt-5'}>
        {data?.data.length > 0 && !isLoading && <Pagination meta={data?.meta} onNext={onNext} onPrev={onPrev} />}
      </section>
    </div>
  );
};

export default Landing;
