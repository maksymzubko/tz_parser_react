import React from 'react';
import { Article } from '@/api/articles/types.ts';
import NoImg from '@/assets/no-img.png';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { useNavigate } from 'react-router-dom';
import { links } from '@/router.tsx';
import { convertDateToString } from '@/lib/utils.ts';

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'card_article w-full flex justify-between 2xl:items-start items-center flex-col md:w-[40%] gap-4 p-4 bg-light-2 dark:bg-dark-3 rounded-2xl mx-3'
      }
    >
      {convertDateToString(article.date)}
      <div
        className={'flex 2xl:flex-row flex-col justify-center items-center 2xl:items-start gap-4'}
      >
        <img
          src={article.image ?? NoImg}
          className={'w-[300px] h-full object-cover'}
          alt={'image'}
        />
        <div className={'content w-full'}>
          <h3>
            {article.title.length > 200 ? `${article.title.substring(0, 200)}...` : article.title}
          </h3>
        </div>
      </div>
      <div className={'flex flex-wrap gap-2'}>
        {article.categories.map((c) => (
          <Badge
            variant="outline"
            className={'dark:bg-dark-4 bg-gray-200 border-dark-3 text-dark-4 dark:text-light-1'}
          >
            {c}
          </Badge>
        ))}
      </div>

      <Button
        className={'w-[200px]'}
        onClick={() => navigate(`${links.article}${article.id}`, { state: { id: article.id } })}
      >
        Читати
      </Button>
    </div>
  );
};

export default ArticleCard;
