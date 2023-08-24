import { useEffect, useState } from 'react';
import { Order, PageArticles, PageOptions } from '@/api/articles/types.ts';
import articlesApi from '@/api/articles/articles.api.ts';
import SearchBar from '@/components/shared/SearchBar.tsx';
import ArticleCard from '@/components/cards/ArticleCard.tsx';
import { LogIn, SlidersHorizontal } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion.tsx';

const Landing = () => {
  const [options, setOptions] = useState<PageOptions>({
    take: 10,
    page: 1,
    category: '',
    search: '',
    order: Order['ASC']
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
    articlesApi
      .getArticles(options)
      .then((res) => {
        console.log(res);
        setArticles(res);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, [options]);

  const onChange = (_options: PageOptions) => {
    setOptions((prev) => {
      return { ...prev, ..._options };
    });
  };

  return (
    <div className={'max-w-full dark:rounded-full flex flex-col gap-4'}>
      <Accordion type="single" collapsible className={'border-none max-w-full'}>
        <AccordionItem
          className={
            'border-none bg-light-2 dark:bg-dark-3 [&>h3]:flex [&>h3]:justify-end self-end'
          }
          value="item-1"
        >
          <AccordionTrigger
            className={'block !w-[40px] !max-w-[40px] items-end [&>svg:nth-child(2)]:hidden'}
          >
            <SlidersHorizontal />
          </AccordionTrigger>
          <AccordionContent>
            <SearchBar onChange={onChange} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <section className={'flex flex-wrap gap-4 mb-14 w-full justify-center'}>
        {articles?.data?.length > 0 ? (
          articles.data.map((a) => <ArticleCard key={a.id} article={a} />)
        ) : (
          <div className={'text-base-regular'}>No data found</div>
        )}
      </section>
    </div>
  );
};

export default Landing;
