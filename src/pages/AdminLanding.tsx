import React, { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader.tsx';
import Pagination from '@/components/shared/Pagination.tsx';
import DataTable from '@/components/shared/DataTable.tsx';
import FilterAccordion from '@/components/ui/filter-accordion.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { useGetArticlesQuery } from '@/redux/api/articleApi.ts';
import { Order, PageOptions } from '@/redux/api/types/article.types.ts';

const AdminLanding = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<PageOptions>({
    take: 10,
    page: 1,
    category: '',
    search: '',
    order: Order['DESC']
  });

  const { data: articles, isError, isLoading } = useGetArticlesQuery(options);

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

  useEffect(() => {
    setTimeout(() => {
      scroll({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [articles]);

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

      {isLoading && (
        <div className={'fixed top-1/2 left-1/2'}>
          <Loader />
        </div>
      )}

      <section
        className={`${
          isLoading ? 'invisible' : 'visible'
        } transition ease-in flex flex-wrap gap-4 w-full justify-center`}>
        {articles?.data?.length > 0 ? (
          <DataTable data={articles.data} />
        ) : (
          <h2 className={'text-base-regular font-bold text-[32px] text-center w-full'}>Нічого не знайдено</h2>
        )}
      </section>

      <section className={'mb-14 mt-5'}>
        {articles?.data.length > 0 && !isLoading && (
          <Pagination meta={articles?.meta} onNext={onNext} onPrev={onPrev} />
        )}
      </section>
    </div>
  );
};

export default AdminLanding;
