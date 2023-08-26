import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '@/components/ui/Loader.tsx';
import ArticleForm from '@/components/forms/ArticleForm.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { useGetArticleByIdQuery } from '@/redux/api/articleApi.ts';

const AdminArticle = () => {
  const params = useLocation();
  const { toast } = useToast();

  let id = '';
  if (params.pathname.includes('edit')) id = params.pathname.split('/').at(-1);

  const { data: article, isError, error, isLoading } = useGetArticleByIdQuery(id.length ? id : '-1');

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Помилка :(',
        description: 'Щось пішло не так, спробуйте ще!',
        duration: 1500,
        variant: 'destructive'
      });
    }
  }, [isError, error, toast]);

  if (isLoading) return <Loader />;

  if (id && !article) return <h3 className={'bg-light-2 dark:bg-dark-3 text-body-medium'}>Not found Article</h3>;

  return (
    <section className={'w-full flex items-center justify-center'}>
      <div className={'flex flex-col gap-4 items-center justify-center mb-12 w-[80%] 2xl:w-[60%]'}>
        <h3 className={'font-bold w-full text-left text-body-medium text-[32px]'}>
          {id ? 'Редагування' : 'Створення'} посту
        </h3>
        <ArticleForm initialData={article} />
      </div>
    </section>
  );
};

export default AdminArticle;
