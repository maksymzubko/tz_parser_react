import React, { useEffect, useState } from 'react';
import { Article as ArticleType } from '@/api/articles/types.ts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NoImg from '@/assets/no-img.png';
import articlesApi from '@/api/articles/articles.api.ts';
import moment from 'moment';
import { convertDateToString } from '@/lib/utils.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { links } from '@/router.tsx';
import { Home, LucideHome } from 'lucide-react';

const Article = () => {
  const [loading, setLoading] = useState(true);
  const params = useLocation();
  const navigate = useNavigate();

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
        console.log(reason);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div
        role="status"
        className={'bg-light-2 dark:bg-dark-3 h-full w-full flex items-center justify-center'}
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="blue"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

  const fixLinks = (str: string) => {
    const fixed = str.replaceAll('/static/', 'https://www.rbc.ua/static/');
    const removeFirst = fixed.replace(/\s*(<p>)/g, '$1');
    return removeFirst.replace(/(<\/p>)\s*/g, '$1');
  };

  if (article)
    return (
      <div
        className={
          'card_article w-full flex justify-between 2xl:items-start items-center flex-col gap-4 p-4 bg-light-2 dark:bg-dark-3 mb-10'
        }
      >
        <Button onClick={() => navigate(links.landing)} className={'flex gap-4 items-center mb-5'}>
          <Home /> Back to home
        </Button>
        <div className={'flex flex-col justify-center items-center gap-4 w-full'}>
          <div className={'flex flex-col items-start gap-4'}>
            <span className={'text-body-medium text-[24px]'}>
              {convertDateToString(article.date)}
            </span>
            <img
              src={article.image ?? NoImg}
              className={'float-left max-w-full md:max-w-[700px] h-full object-cover'}
              alt={'image'}
            />
            <div className={'flex flex-wrap gap-2'}>
              {article.categories.map((c) => (
                <Badge
                  variant="outline"
                  className={
                    'dark:bg-dark-4 bg-gray-200 border-[1px] border-dark-3 text-dark-4 dark:text-light-1'
                  }
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
