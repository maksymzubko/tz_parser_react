import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import Loader from '@/components/ui/Loader.tsx';
import { ArticleValidation } from '@/lib/validations/article.ts';
import { Article, ArticleRequest } from '@/api/articles/types.ts';
import { Textarea } from '@/components/ui/textarea.tsx';
import CategoryCard from '@/components/cards/CategoryCard.tsx';
import articlesApi from '@/api/articles/articles.api.ts';
import { useNavigate } from 'react-router-dom';
import { links } from '@/router.tsx';
import { AxiosError } from 'axios';

interface Props {
  initialData?: Article;
}

interface Error {
  errors: { field: 'title' | 'sourceLink' | 'content' | 'image' | 'category'; message: string }[] | undefined;
}

const ArticleForm = ({ initialData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(initialData?.categories ?? []);
  const form = useForm({
    resolver: zodResolver(ArticleValidation),
    defaultValues: {
      title: initialData?.title ?? '',
      sourceLink: initialData?.sourceLink ?? '',
      content: initialData?.content ?? '',
      image: initialData?.image ?? '',
      category: ''
    }
  });

  const handleError = (err: AxiosError<Error>) => {
    if (err.response.data.errors) {
      err.response.data.errors.forEach((d) => {
        form.setError(d.field, { message: d.message });
      });
    } else {
      toast({
        title: 'Помилка :(',
        description: 'Щось пішло не так, спробуйте ще!',
        duration: 1500,
        variant: 'destructive'
      });
    }
  };

  const handleNavigate = (articleId: number, dismiss: () => void) => {
    navigate(`${links.article}${articleId}`);
    dismiss();
  };

  const onSubmit = (values: zod.infer<typeof ArticleValidation>) => {
    setLoading(true);
    const { title, image, content, sourceLink } = values;
    const body = { title, categories, content, image, date: new Date().getTime(), sourceLink } as ArticleRequest;
    if (initialData) {
      articlesApi
        .updateArticle(initialData.id, body)
        .then((res) => {
          const { dismiss } = toast({
            title: `Пост #${res.id} відредаговано.`,
            action: <Button onClick={() => handleNavigate(res.id, dismiss)}>Переглянути</Button>
          });
        })
        .catch((err: AxiosError<Error>) => {
          handleError(err);
        })
        .finally(() => setLoading(false));
    } else {
      articlesApi
        .createArticle(body)
        .then((res) => {
          const { dismiss } = toast({
            title: `Пост #${res.id} створено.`,
            action: <Button onClick={() => handleNavigate(res.id, dismiss)}>Переглянути</Button>
          });
          form.reset();
          setCategories([]);
        })
        .catch((err: AxiosError<Error>) => {
          handleError(err);
        })
        .finally(() => setLoading(false));
    }
  };

  const onDelete = (name: string) => {
    if (categories.includes(name)) setCategories((prev) => prev.filter((c) => c !== name));
  };

  const onAddCategory = () => {
    const { category } = form.getValues();
    if (category.length < 3) {
      form.setError('category', { message: 'Мінімум 3 символи!' });
      return;
    }
    if (category.length > 30) {
      form.setError('category', { message: 'Максимум 30 символів!' });
      return;
    }
    if (categories.includes(category)) {
      form.setError('category', { message: 'Така категорія вже є!' });
      return;
    }
    setCategories((prev) => [...prev, category]);
    form.setValue('category', '');
  };

  return (
    <section className={'p-5 w-full bg-light-2 dark:bg-dark-4 rounded-2xl'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete={'off'} className="flex flex-col gap-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={''}>
                <FormLabel className={'[:not(invalid)]:text-dark-3 :not(invalid)]:dark:text-light-1'}>
                  Заголовок
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={form.formState.isSubmitting || loading}
                    placeholder={'Заголовок новини'}
                    className={'max-h-[200px] min-h-[50px]'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sourceLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'[:not(invalid)]:text-dark-3 :not(invalid)]:dark:text-light-1'}>
                  Посилання на оригінал
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting || loading}
                    type={'text'}
                    placeholder={'Посилання на оригінал'}
                    className={''}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'[:not(invalid)]:text-dark-3 :not(invalid)]:dark:text-light-1'}>
                  Посилання на обкладинку
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting || loading}
                    type={'text'}
                    placeholder={'Посилання на обкладинку'}
                    className={''}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'[:not(invalid)]:text-dark-3 :not(invalid)]:dark:text-light-1'}>
                  Нова категорія
                </FormLabel>
                <FormControl>
                  <div>
                    <div className={'flex items-center justify-between gap-4'}>
                      <Input
                        type={'text'}
                        disabled={form.formState.isSubmitting || loading}
                        placeholder={'Назва категорії'}
                        className={'w-[80%]'}
                        {...field}
                      />
                      <Button
                        disabled={form.formState.isSubmitting || loading}
                        className={'w-[15%]'}
                        type={'button'}
                        onClick={onAddCategory}
                      >
                        Додати
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
                <div
                  className={`flex justify-start items-center flex-wrap gap-4 ${
                    form.formState.isSubmitting || loading ? 'pointer-events-none' : 'pointer-events-auto'
                  }`}
                >
                  {categories.map((c) => (
                    <CategoryCard key={`category-card-${c}`} name={c} onDelete={() => onDelete(c)} />
                  ))}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'[:not(invalid)]:text-dark-3 :not(invalid)]:dark:text-light-1'}>
                  Контент
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={form.formState.isSubmitting || loading}
                    placeholder={'Контент (можна HTML)'}
                    className={'max-h-[400px] min-h-[50px]'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={'w-full flex items-end justify-center gap-4'}>
            <Button type={'submit'} disabled={form.formState.isSubmitting || loading} className={'w-[60%]'}>
              {form.formState.isSubmitting || loading ? <Loader /> : initialData ? 'Редагувати' : 'Створити'}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ArticleForm;
