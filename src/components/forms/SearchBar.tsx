import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleOptionsValidation } from '@/lib/validations/options.ts';
import * as zod from 'zod';
import { Order, PageOptions } from '@/api/articles/types.ts';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label.tsx';

interface Props {
  onChange: (_option: PageOptions) => void;
}

const SearchBar = ({ onChange }: Props) => {
  const form = useForm({
    resolver: zodResolver(ArticleOptionsValidation),
    defaultValues: {
      search: '',
      sortBy: 'Desc',
      category: ''
    }
  });

  const onSubmit = async (values: zod.infer<typeof ArticleOptionsValidation>) => {
    const { search, sortBy, category } = values;
    onChange({ search, order: sortBy === 'ASC' ? Order['ASC'] : Order['DESC'], category });
  };

  return (
    <section
      className={
        'p-3 w-full bg-light-2 [&_label]:!text-dark-3 dark:[&_label]:!text-light-1 dark:bg-dark-3'
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete={'off'}
          className="flex flex-col gap-10"
        >
          <div className={'flex md:flex-row items-center gap-10 flex-col'}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className={'flex flex-col w-full gap-3'}>
                  <FormLabel className={'text-base-semibold text-light-2'}>Пошук</FormLabel>
                  <FormControl>
                    <Input
                      type={'text'}
                      placeholder={'Пошук за назвої або контентом'}
                      className={'account-form_input no-focus'}
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
                <FormItem className={'flex flex-col w-full gap-3'}>
                  <FormLabel className={'text-base-semibold text-light-2'}>Категорія</FormLabel>
                  <FormControl>
                    <Input
                      type={'text'}
                      placeholder={'Категорія новини'}
                      className={'account-form_input no-focus'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem className={'flex flex-col w-full gap-3'}>
                  <FormLabel className={'text-base-semibold text-light-2'}>
                    Сортування за датою
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={form.getValues().sortBy}
                      className={'flex items-center justify-evenly'}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="DESC" id="DESC" />
                        <Label htmlFor="option-two">Спочатку нові</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ASC" id="ASC" />
                        <Label htmlFor="option-one">Спочатку старі</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={'w-full flex items-end justify-center gap-4'}>
            <Button
              type={'submit'}
              disabled={form.formState.isSubmitting}
              className={'bg-primary-500 w-[60%] md:w-[20%]'}
            >
              Знайти
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default SearchBar;
