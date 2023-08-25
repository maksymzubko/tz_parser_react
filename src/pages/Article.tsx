import React, { useEffect, useState } from 'react';
import { Article as ArticleType } from '@/api/articles/types.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import NoImg from '@/assets/no-img.png';
import articlesApi from '@/api/articles/articles.api.ts';
import { convertDateToString } from '@/lib/utils.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { links } from '@/router.tsx';
import { Home } from 'lucide-react';
import Loader from '@/components/ui/Loader.tsx';
import { useToast } from '@/components/ui/use-toast.ts';

const Article = () => {
  const [loading, setLoading] = useState(true);
  const params = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const id = params.pathname.split('/').at(-1);
  const [article, setArticle] = useState<ArticleType>();

  useEffect(() => {
    setLoading(true);
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
  }, [id]);

  const fixLinks = (str: string) => {
    const fixed = str.replaceAll('/static/', 'https://www.rbc.ua/static/');
    const removeFirst = fixed.replace(/\s*(<p>)/g, '$1');
    return removeFirst.replace(/(<\/p>)\s*/g, '$1');
  };

  if (loading) return <Loader />;

  if (article)
    return (
      <div
        className={
          'card_article w-full flex justify-between 2xl:items-start items-center flex-col gap-4 p-4 bg-light-2 dark:bg-dark-3 mb-10'
        }
      >
        <Button onClick={() => navigate(links.landing)} className={'flex gap-4 items-center mb-5'}>
          <Home /> На головну
        </Button>
        <div className={'flex flex-col justify-center items-center gap-4 w-full'}>
          <div className={'flex flex-col items-start gap-4'}>
            <span className={'text-body-medium text-[24px]'}>{convertDateToString(article.date)}</span>
            <img
              src={article.image ?? NoImg}
              className={'float-left max-w-full md:max-w-[700px] h-full object-cover'}
              alt={'image'}
            />
            <div className={'flex flex-wrap gap-2'}>
              {article.categories.map((c) => (
                <Badge
                  key={`badge-article-${c}`}
                  variant="outline"
                  className={'dark:bg-dark-4 bg-gray-200 border-[1px] border-dark-3 text-dark-4 dark:text-light-1'}
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
          <div className={'content flex flex-col items-center'}>
            <h3 className={'text-body-medium text-[24px] md:text-[32px] font-bold'}>
              {article.title.length > 200 ? `${article.title.substring(0, 200)}...` : article.title}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: fixLinks(article.content) }}
              className={
                'w-[100%] md:w-[80%] mt-5 text-body-medium whitespace-pre-wrap [&_p]:mb-4 [&_p]:flex [&_p]:flex-col [&_p]:items-center'
              }
            ></div>
          </div>
        </div>
      </div>
    );

  return <h3 className={'bg-light-2 dark:bg-dark-3 text-body-medium'}>Not found Article((</h3>;
};

export default Article;
