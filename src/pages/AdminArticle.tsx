import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Article as ArticleType } from '@/api/articles/types.ts';
import articlesApi from '@/api/articles/articles.api.ts';
import Loader from '@/components/ui/Loader.tsx';
import ArticleForm from '@/components/forms/ArticleForm.tsx';
import {useToast} from "@/components/ui/use-toast.ts";

const AdminArticle = () => {
  const [loading, setLoading] = useState(true);
  const params = useLocation();
  const {toast} = useToast();

  let id = '';
  if (params.pathname.includes('edit')) id = params.pathname.split('/').at(-1);

  const [article, setArticle] = useState<ArticleType>();

  useEffect(() => {
    setLoading(true);
    if (id) {
      articlesApi
        .getArticle(id)
        .then((res) => {
          setArticle(res);
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
    }
    setLoading(false);
  }, [id]);

  if (loading) return <Loader />;

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
