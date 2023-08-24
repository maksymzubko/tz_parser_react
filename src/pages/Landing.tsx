import {useEffect, useState} from 'react';
import {Order, PageArticles, PageOptions} from '@/api/articles/types.ts';
import articlesApi from '@/api/articles/articles.api.ts';
import SearchBar from '@/components/forms/SearchBar.tsx';
import ArticleCard from '@/components/cards/ArticleCard.tsx';
import {LogIn, SlidersHorizontal} from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion.tsx';
import Pagination from "@/components/shared/Pagination.tsx";

const Landing = () => {
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        articlesApi
            .getArticles(options)
            .then((res) => {
                console.log(res);
                setArticles(res);
                setTimeout(() => {
                    scroll({top: 0, behavior: 'smooth'})
                }, 100)
            })
            .catch((reason) => {
                console.log(reason);
            }).finally(() => setLoading(false));
    }, [options]);

    const onChange = (_options: PageOptions) => {
        setOptions((prev) => {
            return {...prev, ..._options};
        });
    };

    const onNext = () => {
        if (articles.meta && articles.meta.hasNextPage)
            setOptions(prev => {
                return {...prev, page: prev.page + 1}
            })
    }

    const onPrev = () => {
        if (articles.meta && articles.meta.hasPreviousPage)
            setOptions(prev => {
                return {...prev, page: prev.page - 1}
            })
    }

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
                        className={
                            'flex justify-center gap-4 !w-[40px] !max-w-[140px] items-end [&>svg:nth-child(3)]:hidden'
                        }
                    >
                        <span className={'text-body-medium'}>Фільтр</span>
                        <SlidersHorizontal/>
                    </AccordionTrigger>
                    <AccordionContent>
                        <SearchBar onChange={onChange}/>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <section className={'flex flex-wrap gap-4 w-full justify-center'}>
                {articles?.data?.length > 0 ? (
                    articles.data.map((a) => <ArticleCard key={a.id} article={a}/>)
                ) : (
                    <div className={'text-base-regular'}>No data found</div>
                )}
            </section>

            <section className={"mb-14 mt-5"}>
                {articles?.meta && <Pagination meta={articles?.meta} onNext={onNext} onPrev={onPrev}/>}
            </section>
        </div>
    );
};

export default Landing;
